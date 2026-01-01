// utils/emailQueue.js
let queue = [];
let processing = false;

const RATE_LIMIT_DELAY = 600;

async function processQueue() {
  if (processing || queue.length === 0) return;

  processing = true;
  const job = queue.shift();

  try {
    await job();
  } catch (err) {
    console.error("Email job failed:", err.message);
  }

  setTimeout(() => {
    processing = false;
    processQueue();
  }, RATE_LIMIT_DELAY);
}

function enqueueEmail(job) {
  queue.push(job);
  processQueue();
}

module.exports = { enqueueEmail };
