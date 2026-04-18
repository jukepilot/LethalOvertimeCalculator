"use strict";

const els = {
  quota: document.getElementById("quotaInput"),
  totalSold: document.getElementById("totalSoldInput"),
  deadlineDays: document.getElementById("deadlineDaysInput"),
  overtime: document.getElementById("overtime"),
};

// helpers
const digitsOnly = (v) => v.replace(/\D/g, "");
const toInt = (v) => parseInt(v, 10) || 0;
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const autoSize = (el) => el.setAttribute("size", Math.max(1, el.value.length));

// events
Object.values(els).slice(0, 3).forEach((el) =>
  el.addEventListener("input", handleInput)
);

init();

function init() {
  handleInput();
  els.totalSold.focus();
}

function handleInput() {
  els.quota.value = digitsOnly(els.quota.value);
  els.totalSold.value = digitsOnly(els.totalSold.value);

  autoSize(els.quota);
  autoSize(els.totalSold);

  els.deadlineDays.value = clamp(toInt(els.deadlineDays.value), 0, 3);

  updateOvertime();
}

function updateOvertime() {
  const sold = toInt(els.totalSold.value);
  const quota = toInt(els.quota.value);
  let days = toInt(els.deadlineDays.value);

  if (days === 0) days = -1;

  const bonus = Math.max(0, Math.floor((sold - quota) / 5 + 15 * days));
  els.overtime.textContent = `$${bonus}`;
}