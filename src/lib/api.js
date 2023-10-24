import slugify from 'slugify';
import { SHORTCUTS } from './constants';
import Database from 'better-sqlite3';
import { nanoid } from '$lib/util';
import { DB_PATH, ADMIN_PASSWORD } from '$env/static/private';
import { Blob } from 'node:buffer';
import { Pool } from 'pg'

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

const pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: "Cikarang~42",
  database: "rust",
  port: POSTGRES_PORT,
  connectionTimeoutMillis: 5000,
})
const client = await pool.connect()




// const db = new Database(DB_PATH, {
//   // verbose: console.log
// });
// db.pragma('journal_mode = WAL');
// db.pragma('case_sensitive_like = true');



/**
 * List all available articles (newest first)
 */
export async function getArticles(currentUser) {
  let articles;
  let statement;
  let query;

  if (currentUser) {
    // When logged in, show both drafts and published articles
    query = 'SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles ORDER BY modified_at DESC';
    /*const query = {
      text: 'SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles ORDER BY modified_at DESC',
      values: ['Brian', 'Carlson'],
      rowMode: 'array',
    }*/
    /*statement = pool.query(
      'SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles ORDER BY modified_at DESC'
    );*/
  } else {
    query = 'SELECT * FROM articles WHERE published_at IS NOT NULL ORDER BY published_at DESC';
    /*statement = pool.query(
      'SELECT * FROM articles WHERE published_at IS NOT NULL ORDER BY published_at DESC'
    );*/
  }

  const res = await client.query(query);

  articles = res.rows;
  console.log(articles);
  return articles;
}


/**
 * Creates a new article
 */
export async function createArticle(title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

    let slug = slugify(title, {
      lower: true,
      strict: true
    });

    // If slug is already used, we add a unique postfix
    const articleExists = await client.query('SELECT * FROM articles WHERE slug = $1',[slug]);
    if (articleExists) {
      slug = slug + '-' + nanoid();
    }

    client.query(`
        INSERT INTO articles (slug, title, content, teaser, published_at)
        VALUES($1, $2, $3, $4, NOW())
      `,[slug, title, content, teaser]);

  const newArticleQuery = "SELECT slug, created_at FROM articles WHERE slug = $1";
  const newArticle = await client.query(newArticleQuery,[slug]);
  return newArticle;
}

/**
 * We automatically extract a teaser text from the document's content.
 */
export async function updateArticle(slug, title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const query = `
    UPDATE articles
    SET title = $1, content = $2, teaser = $3, updated_at = NOW()
    WHERE slug = $4
  `;
  const updateStmt = await client.query(query,[title, content, teaser, slug]);
  const updatedArticle = await client.query("SELECT slug, updated_at FROM articles WHERE slug = $1",[slug]);

  return updatedArticle.rows;
}

/*
  This can be replaced with any user-based authentication system
*/
export async function authenticate(password, sessionTimeout) {
  const expires = __getDateTimeMinutesAfter(sessionTimeout);
  if (password === ADMIN_PASSWORD) {
    const sessionId = nanoid();

    // Now is a good time to remove expired sessions
    await client.query('DELETE FROM sessions WHERE expires < $1', [new Date().toISOString()]);

    // Create a new session
    await client.query('INSERT INTO sessions (session_id, expires) values($1, $2) returning session_id',[sessionId, expires]);

    return { sessionId };
  } else {
    throw 'Authentication failed.';
  }
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId) {
  pool.query('DELETE FROM sessions WHERE session_id = $1',[sessionId]);
  return true;
}

/**
 * Given a slug, determine article to "read next"
 */
export async function getNextArticle(slug) {
  const query = `
    WITH 
    previous_published AS (
      SELECT
        title,
        teaser,
        slug,
        published_at
      FROM articles
      WHERE
        published_at < (SELECT published_at FROM articles WHERE slug = $1)
      ORDER BY published_at DESC
      LIMIT 1
    ),
    latest_article AS (
      SELECT
        title,
        teaser,
        slug,
        published_at
      FROM articles
      WHERE slug <> $1
      ORDER BY published_at DESC
      LIMIT 1
    )
    SELECT title, teaser, slug, published_at
    FROM (
      SELECT * FROM previous_published
      UNION
      SELECT * FROM latest_article
    ) AS article
    ORDER BY published_at ASC
    LIMIT 1;
  `;

  const result = await client.query(query,[slug]);
  return result.rows;
}

/**
 * Search within all searchable items (including articles and website sections)
 */
export async function search(q, currentUser) {
  let query;
  if (currentUser) {
    query = `
      SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
      FROM articles
      WHERE title LIKE %$1% COLLATE NOCASE
      ORDER BY modified_at DESC;
    `;
  } else {
    query = `
      SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
      FROM articles
      WHERE title LIKE %$1% COLLATE NOCASE AND published_at IS NOT NULL
      ORDER BY modified_at DESC;
    `;
  }

  const results = await client.query(query,[q]);

  // Also include predefined shortcuts in search
  SHORTCUTS.forEach(shortcut => {
    if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
      results.push(shortcut);
    }
  });

  return results;
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug) {
  let article;
  const query = "SELECT * FROM articles WHERE slug = $1 LIMIT 1";
  // const { article } = await client.query(query,[slug]);
  const result = await client.query(query,[slug]);
  console.log(result.rows[0]);
  article = result.rows;
  return article[0];
}

/**
 * Remove the entire article
 */
export async function deleteArticle(slug, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const query = "DELETE FROM articles WHERE slug = $1";
  const result = pool.query(query,[slug]);

  return result.changes > 0;
}

/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(session_id) {
  const session = await client.query("SELECT session_id, expires FROM sessions WHERE session_id = $1 AND expires > $2", [
      session_id,
      new Date().toISOString(),
    ]);
  /*const stmt = await pool.query(
    'SELECT session_id, expires FROM sessions WHERE session_id = $1 AND expires > $2'
  );
  const session = stmt.get(session_id, new Date().toISOString());*/

  if (session.rows) {
    return { name: 'Admin' };
  } else {
    return null;
  }
}


/**
 * Update the page
 */
export async function createOrUpdatePage(page_id, page, currentUser) {
  if (!currentUser) throw new Error('Not authorized');
  const pageExists = await client.query("SELECT page_id FROM pages WHERE page_id = $1", [page_id]);
  if (pageExists) {
    return await client.query('UPDATE pages SET data = $1, updated_at = $2 WHERE page_id = $3 RETURNING page_id', [JSON.stringify(page),new Date().toISOString(), page_id]);
  } else {
    return await client.query('INSERT INTO pages (page_id, data, updated_at) values($1, $2, $3) RETURNING page_id', [page_id, JSON.stringify(page), new Date().toISOString()]);
  }
}

/**
 * E.g. getPage("home") gets all dynamic data for the home page
 */
export async function getPage(page_id) {
  const page = await client.query('SELECT data FROM pages WHERE page_id = $1', [page_id]);
  if (page?.data) {
    return JSON.parse(page.data);
  } else {
    return null;
  }
}

/**
 * We can count all kinds of things with this.
 */
export async function createOrUpdateCounter(counter_id) {
  try {
    await client.query('BEGIN')
    const counter_exists = await client.query('SELECT counter_id FROM counters WHERE counter_id = $1', 
      [counter_id]);
    if (counter_exists.rows) {
      return await client.query('UPDATE counters SET count = count + 1 WHERE counter_id = $1 RETURNING count', 
    [counter_id]);
    } else {
      return await client.query('INSERT INTO counters (counter_id, count) values($1, 1) RETURNING count', 
    [counter_id]);
    }
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } 
  /*finally {
    client.release()
  }*/


  /*return db.transaction(() => {
    // Remove recipients associated with the friend if there are any entries
    const counter_exists = await pool.query('SELECT counter_id FROM counters WHERE counter_id = $1', 
    [counter_id]);
    if (counter_exists) {
      return pool.query('UPDATE counters SET count = count + 1 WHERE counter_id = $1 RETURNING count', 
    [counter_id]);
    } else {
      return pool.query('INSERT INTO counters (counter_id, count) values($1, 1) RETURNING count', 
    [counter_id]);
    }
  })();*/
}

// asset_id is a string and has the form path
export async function storeAsset(asset_id, file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const sql = `
  INSERT into assets (asset_id, mime_type, updated_at, size, data) VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (asset_id) DO
  UPDATE
     SET mime_type = excluded.mime_type,
         updated_at = excluded.updated_at,
         size = excluded.size,
         data = excluded.data
  WHERE asset_id = excluded.asset_id
  `;
  const stmnt = await client.query(sql,[asset_id, file.type, new Date().toISOString(), file.size, buffer]);
}

export function getAsset(asset_id) {
  const sql = `
  SELECT
    asset_id,
    mime_type,
    updated_at,
    size,
    data
  FROM assets
  WHERE asset_id = $1
  `;

  const stmnt = client.query(sql,[asset_id]);
  return {
    filename: row.asset_id.split('/').slice(-1),
    mimeType: row.mime_type,
    lastModified: row.updated_at,
    size: row.size,
    data: new Blob([row.data], { type: row.mime_type })
  };
}

/**
 * Helpers
 */
function __getDateTimeMinutesAfter(minutes) {
  return new Date(new Date().getTime() + minutes * 60000).toISOString();
}
