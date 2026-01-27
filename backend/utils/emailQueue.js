// utils/emailQueue.js
console.log('📨 Email queue initialized');

let queue = [];
let processing = false;

const RATE_LIMIT_DELAY = 600;

async function processQueue() {
  if (processing || queue.length === 0) return;

  processing = true;
  const job = queue.shift();

  try {
    console.log('➡️ Processing email job. Remaining:', queue.length);
    await job();
    console.log('✅ Email job completed');
  } catch (err) {
    console.error('❌ Email job failed:', err);
  } finally {
    setTimeout(() => {
      processing = false;
      processQueue();
    }, RATE_LIMIT_DELAY);
  }
}

function enqueueEmail(job) {
  queue.push(job);
  console.log('📥 Email job enqueued. Queue size:', queue.length);
  processQueue();
}

module.exports = { enqueueEmail };
