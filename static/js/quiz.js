/**
 * @class       : quiz
 * @author      : Ken Shibata (kenxshibata@gmail.com)
 * @description : for the quiz shortcode
 */


async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function quiz(id, i, ans, page) {
  const ie = document.getElementById(`quiz-${id}-i${i}`);
  const se = document.getElementById(`quiz-${id}-s${i}`);
  return async () => {
    localStorage.setItem(`${page}-quiz-${id}-i${i}`, ie.value);
    se.innerText = (await digestMessage(ie.value)) === ans ? "✓" : "✗";
  }
}

function quizzes(es, target) {
  return async () => {
    const total = await Promise.all(es.map(async (e) => await digestMessage(e.value)));
    target.innerText = await digestMessage(total);
  };
}

export { quiz, quizzes, digestMessage };
