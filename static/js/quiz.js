/**
 * @class       : quiz
 * @author      : Ken Shibata (kenxshibata@gmail.com)
 * @description : for the quiz shortcode
 */

import cyrb53 from "/mpm2dp-0a/js/cyrb53.js";

function quiz(id, i, ans) {
  const ie = document.getElementById(`quiz-${id}-i${i}`);
  const se = document.getElementById(`quiz-${id}-s${i}`);
  return () => {
    se.innerText = cyrb53(ie.value) === ans ? "✓" : "✗";
  };
}

function quizzes(es, target) {
  return () => {
    let total = "";
    es.forEach((e) => {
      total += cyrb53(e.value);
    });
    target.innerText = cyrb53(total);
  };
}

export { quiz, quizzes };
