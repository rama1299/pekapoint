import {readablestreamToJson} from '../../helpers/readablestreamToJson'

/** @type {import('./$types').PageServerLoad} */
export async function load({url}) {
	try {
		const page = url.searchParams.get('page')
		const res = await fetch(`http://localhost:3000/api/product?page=${page}`)
		const parseJson = await readablestreamToJson(res.body)
		let data = []
		if (parseJson && data.length === 0) {
			data = parseJson
		} else if (parseJson && data.length < 0) {
			data = [...data, ...parseJson]
		}
		return {data, page}
	} catch (error) {
		console.log(error)
	}
}

const dataDummy = [
	{
		id: 1,
		title: 'Xiaomi 14',
		rank: 100,
		image_url: 'https://images.versus.io/objects/xiaomi-14.front.medium2x.1698408371952.webp',
		price: '20109930',
		Specs: [{
			id: 1,
			title: 'Display',
			labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
			scores: [80, 87, 79, 93, 97],
			antutu_score: '289',
			dxo_score: '265',
			details: [
				{
					title: 'Screen size',
					description: '6.73"'
				},
				{
					title: 'Pixel density',
					description: '522ppi'
				},
				{
					title: 'Resolution',
					description: '1440 x 3200px'
				},
				{
					title: 'Refresh rate',
					description: '120Hz'
				},
				{
					title: 'Brightness',
					description: '1200nits'
				},
			]
		},
		{
			id: 2,
			title: 'Performance',
			labels: ['Storage', 'RAM', 'CPU', 'GPU'],
			scores: [100, 97, 82, 79],
			antutu_score: '254',
			dxo_score: '232',
			details: [
				{
					title: 'Internal storage',
					description: '1000GB'
				},
				{
					title: 'RAM',
					description: '16GB'
				},
				{
					title: 'Antutu Benchmark score',
					description: '2089905'
				},
				{
					title: 'CPU speed',
					description: '1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz'
				},
				{
					title: 'RAM speed',
					description: '4800MHz'
				},
			]
		},
		{
			id: 3,
			title: 'Camera',
			labels: ['Main', 'Front', 'Video', 'Aperture'],
			scores: [90, 89, 85, 80],
			antutu_score: '267',
			dxo_score: '276',
			details: [
				{
					title: 'Megapixels (main camera)',
					description: '50MP & 50MP & 50MP'
				},
				{
					title: 'Megapixels (front camera)',
					description: '32MP'
				},
				{
					title: 'Video recording (main camera)',
					description: '4320 x 24fps'
				},
				{
					title: 'Wide aperture (main camera)',
					description: 'f/1.4 & f/2 & f/2.2'
				},
				{
					title: 'Optical zoom',
					description: '3.2x'
				},
			]
		},
		{
			id: 4,
			title: 'Battery',
			labels: ['Power', 'Speed', 'Fast Charging', 'Feature', 'Flash'],
			scores: [97, 90, 85, 77, 65],
			antutu_score: '278',
			dxo_score: '287',
			details: [
				{
					title: 'Battery power',
					description: '4880Mah'
				},
				{
					title: 'Charging speed',
					description: '120W'
				},
				{
					title: 'Wireless charging speed',
					description: '50W'
				},
				{
					title: 'Reverse wireless charging speed',
					description: '10w'
				},
			]
		},
		{
			id: 5,
			title: 'Audio',
			labels: ['Stereo', 'Speaker', 'Microphone'],
			scores: [75, 60, 85],
			antutu_score: '244',
			dxo_score: '253',
			details: [
				{
					title: 'Number of microphone',
					description: '4'
				},
			]
		}]
	},
	{
		id: 2,
		title: 'Oppo Find X6 pro',
		rank: 94,
		image_url: 'https://images.versus.io/objects/oppo-find-x6-pro.front.medium.1679402527447.webp',
		price: '19799000',
		Specs: [{
			id: 1,
			title: 'Display',
			labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
			scores: [80, 87, 79, 93, 97],
			antutu_score: '289',
			dxo_score: '265',
			details: [
				{
					title: 'Screen size',
					description: '6.73"'
				},
				{
					title: 'Pixel density',
					description: '522ppi'
				},
				{
					title: 'Resolution',
					description: '1440 x 3200px'
				},
				{
					title: 'Refresh rate',
					description: '120Hz'
				},
				{
					title: 'Brightness',
					description: '1200nits'
				},
			]
		},
		{
			id: 2,
			title: 'Performance',
			labels: ['Storage', 'RAM', 'CPU', 'GPU'],
			scores: [100, 97, 82, 79],
			antutu_score: '254',
			dxo_score: '232',
			details: [
				{
					title: 'Internal storage',
					description: '1000GB'
				},
				{
					title: 'RAM',
					description: '16GB'
				},
				{
					title: 'Antutu Benchmark score',
					description: '2089905'
				},
				{
					title: 'CPU speed',
					description: '1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz'
				},
				{
					title: 'RAM speed',
					description: '4800MHz'
				},
			]
		},
		{
			id: 3,
			title: 'Camera',
			labels: ['Main', 'Front', 'Video', 'Aperture'],
			scores: [90, 89, 85, 80],
			antutu_score: '267',
			dxo_score: '276',
			details: [
				{
					title: 'Megapixels (main camera)',
					description: '50MP & 50MP & 50MP'
				},
				{
					title: 'Megapixels (front camera)',
					description: '32MP'
				},
				{
					title: 'Video recording (main camera)',
					description: '4320 x 24fps'
				},
				{
					title: 'Wide aperture (main camera)',
					description: 'f/1.4 & f/2 & f/2.2'
				},
				{
					title: 'Optical zoom',
					description: '3.2x'
				},
			]
		},
		{
			id: 4,
			title: 'Battery',
			labels: ['Power', 'Speed', 'Fast Charging', 'Feature', 'Flash'],
			scores: [97, 90, 85, 77, 65],
			antutu_score: '278',
			dxo_score: '287',
			details: [
				{
					title: 'Battery power',
					description: '4880Mah'
				},
				{
					title: 'Charging speed',
					description: '120W'
				},
				{
					title: 'Wireless charging speed',
					description: '50W'
				},
				{
					title: 'Reverse wireless charging speed',
					description: '10w'
				},
			]
		},
		{
			id: 5,
			title: 'Audio',
			labels: ['Stereo', 'Speaker', 'Microphone'],
			scores: [75, 60, 85],
			antutu_score: '244',
			dxo_score: '253',
			details: [
				{
					title: 'Number of microphone',
					description: '4'
				},
			]
		}]
	},
	{
		id: 3,
		title: 'Google Pixel 8 Pro',
		rank: 92,
		image_url: 'https://images.versus.io/objects/google-pixel-8-pro.front.medium.1696502540011.webp',
		price: '18987000',
		Specs: [{
			id: 1,
			title: 'Display',
			labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
			scores: [80, 87, 79, 93, 97],
			antutu_score: '289',
			dxo_score: '265',
			details: [
				{
					title: 'Screen size',
					description: '6.73"'
				},
				{
					title: 'Pixel density',
					description: '522ppi'
				},
				{
					title: 'Resolution',
					description: '1440 x 3200px'
				},
				{
					title: 'Refresh rate',
					description: '120Hz'
				},
				{
					title: 'Brightness',
					description: '1200nits'
				},
			]
		},
		{
			id: 2,
			title: 'Performance',
			labels: ['Storage', 'RAM', 'CPU', 'GPU'],
			scores: [100, 97, 82, 79],
			antutu_score: '254',
			dxo_score: '232',
			details: [
				{
					title: 'Internal storage',
					description: '1000GB'
				},
				{
					title: 'RAM',
					description: '16GB'
				},
				{
					title: 'Antutu Benchmark score',
					description: '2089905'
				},
				{
					title: 'CPU speed',
					description: '1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz'
				},
				{
					title: 'RAM speed',
					description: '4800MHz'
				},
			]
		},
		{
			id: 3,
			title: 'Camera',
			labels: ['Main', 'Front', 'Video', 'Aperture'],
			scores: [90, 89, 85, 80],
			antutu_score: '267',
			dxo_score: '276',
			details: [
				{
					title: 'Megapixels (main camera)',
					description: '50MP & 50MP & 50MP'
				},
				{
					title: 'Megapixels (front camera)',
					description: '32MP'
				},
				{
					title: 'Video recording (main camera)',
					description: '4320 x 24fps'
				},
				{
					title: 'Wide aperture (main camera)',
					description: 'f/1.4 & f/2 & f/2.2'
				},
				{
					title: 'Optical zoom',
					description: '3.2x'
				},
			]
		},
		{
			id: 4,
			title: 'Battery',
			labels: ['Power', 'Speed', 'Fast Charging', 'Feature', 'Flash'],
			scores: [97, 90, 85, 77, 65],
			antutu_score: '278',
			dxo_score: '287',
			details: [
				{
					title: 'Battery power',
					description: '4880Mah'
				},
				{
					title: 'Charging speed',
					description: '120W'
				},
				{
					title: 'Wireless charging speed',
					description: '50W'
				},
				{
					title: 'Reverse wireless charging speed',
					description: '10w'
				},
			]
		},
		{
			id: 5,
			title: 'Audio',
			labels: ['Stereo', 'Speaker', 'Microphone'],
			scores: [75, 60, 85],
			antutu_score: '244',
			dxo_score: '253',
			details: [
				{
					title: 'Number of microphone',
					description: '4'
				},
			]
		}]
	},
	{
		id: 4,
		title: 'SamsungGalaxy Z Fold 5',
		rank: 89,
		image_url: 'https://images.versus.io/objects/samsung-galaxy-z-fold-5.front.medium.1690415328393.webp',
		price: '2110993',
		Specs: [{
			id: 1,
			title: 'Display',
			labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
			scores: [80, 87, 79, 93, 97],
			antutu_score: '289',
			dxo_score: '265',
			details: [
				{
					title: 'Screen size',
					description: '6.73"'
				},
				{
					title: 'Pixel density',
					description: '522ppi'
				},
				{
					title: 'Resolution',
					description: '1440 x 3200px'
				},
				{
					title: 'Refresh rate',
					description: '120Hz'
				},
				{
					title: 'Brightness',
					description: '1200nits'
				},
			]
		},
		{
			id: 2,
			title: 'Performance',
			labels: ['Storage', 'RAM', 'CPU', 'GPU'],
			scores: [100, 97, 82, 79],
			antutu_score: '254',
			dxo_score: '232',
			details: [
				{
					title: 'Internal storage',
					description: '1000GB'
				},
				{
					title: 'RAM',
					description: '16GB'
				},
				{
					title: 'Antutu Benchmark score',
					description: '2089905'
				},
				{
					title: 'CPU speed',
					description: '1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz'
				},
				{
					title: 'RAM speed',
					description: '4800MHz'
				},
			]
		},
		{
			id: 3,
			title: 'Camera',
			labels: ['Main', 'Front', 'Video', 'Aperture'],
			scores: [90, 89, 85, 80],
			antutu_score: '267',
			dxo_score: '276',
			details: [
				{
					title: 'Megapixels (main camera)',
					description: '50MP & 50MP & 50MP'
				},
				{
					title: 'Megapixels (front camera)',
					description: '32MP'
				},
				{
					title: 'Video recording (main camera)',
					description: '4320 x 24fps'
				},
				{
					title: 'Wide aperture (main camera)',
					description: 'f/1.4 & f/2 & f/2.2'
				},
				{
					title: 'Optical zoom',
					description: '3.2x'
				},
			]
		},
		{
			id: 4,
			title: 'Battery',
			labels: ['Power', 'Speed', 'Fast Charging', 'Feature', 'Flash'],
			scores: [97, 90, 85, 77, 65],
			antutu_score: '278',
			dxo_score: '287',
			details: [
				{
					title: 'Battery power',
					description: '4880Mah'
				},
				{
					title: 'Charging speed',
					description: '120W'
				},
				{
					title: 'Wireless charging speed',
					description: '50W'
				},
				{
					title: 'Reverse wireless charging speed',
					description: '10w'
				},
			]
		},
		{
			id: 5,
			title: 'Audio',
			labels: ['Stereo', 'Speaker', 'Microphone'],
			scores: [75, 60, 85],
			antutu_score: '244',
			dxo_score: '253',
			details: [
				{
					title: 'Number of microphone',
					description: '4'
				},
			]
		}]
	},
	{
		id: 5,
		title: 'One Plus 11',
		rank: 88,
		image_url: 'https://images.versus.io/objects/oneplus-11.front.medium.1672833111128.webp',
		price: '2010993',
		Specs: [{
			id: 1,
			title: 'Display',
			labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
			scores: [80, 87, 79, 93, 97],
			antutu_score: '289',
			dxo_score: '265',
			details: [
				{
					title: 'Screen size',
					description: '6.73"'
				},
				{
					title: 'Pixel density',
					description: '522ppi'
				},
				{
					title: 'Resolution',
					description: '1440 x 3200px'
				},
				{
					title: 'Refresh rate',
					description: '120Hz'
				},
				{
					title: 'Brightness',
					description: '1200nits'
				},
			]
		},
		{
			id: 2,
			title: 'Performance',
			labels: ['Storage', 'RAM', 'CPU', 'GPU'],
			scores: [100, 97, 82, 79],
			antutu_score: '254',
			dxo_score: '232',
			details: [
				{
					title: 'Internal storage',
					description: '1000GB'
				},
				{
					title: 'RAM',
					description: '16GB'
				},
				{
					title: 'Antutu Benchmark score',
					description: '2089905'
				},
				{
					title: 'CPU speed',
					description: '1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz'
				},
				{
					title: 'RAM speed',
					description: '4800MHz'
				},
			]
		},
		{
			id: 3,
			title: 'Camera',
			labels: ['Main', 'Front', 'Video', 'Aperture'],
			scores: [90, 89, 85, 80],
			antutu_score: '267',
			dxo_score: '276',
			details: [
				{
					title: 'Megapixels (main camera)',
					description: '50MP & 50MP & 50MP'
				},
				{
					title: 'Megapixels (front camera)',
					description: '32MP'
				},
				{
					title: 'Video recording (main camera)',
					description: '4320 x 24fps'
				},
				{
					title: 'Wide aperture (main camera)',
					description: 'f/1.4 & f/2 & f/2.2'
				},
				{
					title: 'Optical zoom',
					description: '3.2x'
				},
			]
		},
		{
			id: 4,
			title: 'Battery',
			labels: ['Power', 'Speed', 'Fast Charging', 'Feature', 'Flash'],
			scores: [97, 90, 85, 77, 65],
			antutu_score: '278',
			dxo_score: '287',
			details: [
				{
					title: 'Battery power',
					description: '4880Mah'
				},
				{
					title: 'Charging speed',
					description: '120W'
				},
				{
					title: 'Wireless charging speed',
					description: '50W'
				},
				{
					title: 'Reverse wireless charging speed',
					description: '10w'
				},
			]
		},
		{
			id: 5,
			title: 'Audio',
			labels: ['Stereo', 'Speaker', 'Microphone'],
			scores: [75, 60, 85],
			antutu_score: '244',
			dxo_score: '253',
			details: [
				{
					title: 'Number of microphone',
					description: '4'
				},
			]
		}]
	},
	{
		id: 6,
		title: 'Samsung Galaxy 21 Ultra (Qualcomm Snapdragon 888)',
		image_url: 'https://images.versus.io/objects/samsung-galaxy-s21-ultra.front.medium.1646341805666.webp',
		rank: 82,
		price: '2010993',
		Specs: [{
			id: 1,
			title: 'Display',
			labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
			scores: [80, 87, 79, 93, 97],
			antutu_score: '289',
			dxo_score: '265',
			details: [
				{
					title: 'Screen size',
					description: '6.73"'
				},
				{
					title: 'Pixel density',
					description: '522ppi'
				},
				{
					title: 'Resolution',
					description: '1440 x 3200px'
				},
				{
					title: 'Refresh rate',
					description: '120Hz'
				},
				{
					title: 'Brightness',
					description: '1200nits'
				},
			]
		},
		{
			id: 2,
			title: 'Performance',
			labels: ['Storage', 'RAM', 'CPU', 'GPU'],
			scores: [100, 97, 82, 79],
			antutu_score: '254',
			dxo_score: '232',
			details: [
				{
					title: 'Internal storage',
					description: '1000GB'
				},
				{
					title: 'RAM',
					description: '16GB'
				},
				{
					title: 'Antutu Benchmark score',
					description: '2089905'
				},
				{
					title: 'CPU speed',
					description: '1 x 3.3GHz & 5 x 3.2GHz & 2.3 x 2GHz'
				},
				{
					title: 'RAM speed',
					description: '4800MHz'
				},
			]
		},
		{
			id: 3,
			title: 'Camera',
			labels: ['Main', 'Front', 'Video', 'Aperture'],
			scores: [90, 89, 85, 80],
			antutu_score: '267',
			dxo_score: '276',
			details: [
				{
					title: 'Megapixels (main camera)',
					description: '50MP & 50MP & 50MP'
				},
				{
					title: 'Megapixels (front camera)',
					description: '32MP'
				},
				{
					title: 'Video recording (main camera)',
					description: '4320 x 24fps'
				},
				{
					title: 'Wide aperture (main camera)',
					description: 'f/1.4 & f/2 & f/2.2'
				},
				{
					title: 'Optical zoom',
					description: '3.2x'
				},
			]
		},
		{
			id: 4,
			title: 'Battery',
			labels: ['Power', 'Speed', 'Fast Charging', 'Feature', 'Flash'],
			scores: [97, 90, 85, 77, 65],
			antutu_score: '278',
			dxo_score: '287',
			details: [
				{
					title: 'Battery power',
					description: '4880Mah'
				},
				{
					title: 'Charging speed',
					description: '120W'
				},
				{
					title: 'Wireless charging speed',
					description: '50W'
				},
				{
					title: 'Reverse wireless charging speed',
					description: '10w'
				},
			]
		},
		{
			id: 5,
			title: 'Audio',
			labels: ['Stereo', 'Speaker', 'Microphone'],
			scores: [75, 60, 85],
			antutu_score: '244',
			dxo_score: '253',
			details: [
				{
					title: 'Number of microphone',
					description: '4'
				},
			]
		}]
	},
]

let specs = [{
	id: 1,
	title: 'Display',
	labels: ['Size', 'Resolution', 'Refresh Rate', 'Brightnes', 'Dislay Type'],
	scores: [80, 87, 79, 93, 97],
	antutu_score: '289',
	dxo_score: '265',
	details: [
		{
			title: 'Screen size',
			description: '6.73"'
		},
		{
			title: 'Pixel density',
			description: '522ppi'
		},
		{
			title: 'Resolution',
			description: '1440 x 3200px'
		},
		{
			title: 'Refresh rate',
			description: '120Hz'
		},
		{
			title: 'Brightness',
			description: '1200nits'
		},
	]
},]