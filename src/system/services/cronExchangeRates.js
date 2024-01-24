import { CronJob } from "cron";
import { ExchangeratesController } from "../../app/exchangerates/controller/exchangeratesController.js";

const updateExchangeratesJob = async () => {
    try {
        await ExchangeratesController.updateExchangerates();
        console.log("Cron job: Exchangerates update successful");
    } catch (error) {
        console.error("Cron job error:", error);
    }
};

const cronSchedule = "0 0 */1 * *";

export const cronJob = new CronJob(cronSchedule, updateExchangeratesJob, null, true);
