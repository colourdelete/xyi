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

function quiz(id, i, ans) {
  const ie = document.getElementById(`quiz-${id}-i${i}`);
  const se = document.getElementById(`quiz-${id}-s${i}`);
  return () => digestMessage(ie.value).then((hash) => se.innerText = hash === ans ? "✓" : "✗");
}

function quizzes(es, target) {
  return () => {
    let total = "";
    es.forEach((e) => {
      total += digestMessage(e.value);
    });
    target.innerText = digestMessage(total);
  };
}

export { quiz, quizzes, digestMessage };
