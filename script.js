let correctAnswer = 0;
let score = 0;

function generateQuestion() {
    const p = 10000; // เงินต้นคงที่ตามขอบเขตโครงงาน [cite: 20, 175]
    const r = (Math.random() * (0.05 - 0.03) + 0.03).toFixed(2); // สุ่มดอกเบี้ย 3-5% [cite: 20, 175]
    const n = Math.floor(Math.random() * 20) + 1; // สุ่มระยะเวลา 1-20 ปี [cite: 20, 175]
    const mode = document.getElementById('mode').value;

    document.getElementById('principal').value = p;
    document.getElementById('rate').value = r;
    document.getElementById('years').value = n;
    document.getElementById('user-answer').value = '';

    if (mode === "simple") {
        correctAnswer = p * (1 + (n * r)); // สูตรดอกเบี้ยคงต้น [cite: 59, 335]
        document.getElementById('formula-display').innerHTML = `โจทย์คงต้น: หาเงินรวมจากเงินต้น ${p} บาท ดอกเบี้ย ${r*100}% นาน ${n} ปี<br><b>สูตร: A = P(1+nr)</b>`;
    } else {
        correctAnswer = p * Math.pow((1 + parseFloat(r)), n); // สูตรดอกเบี้ยทบต้น [cite: 68, 336]
        document.getElementById('formula-display').innerHTML = `โจทย์ทบต้น: หาเงินรวมจากเงินต้น ${p} บาท ดอกเบี้ย ${r*100}% นาน ${n} ปี<br><b>สูตร: A = P(1+r)ⁿ</b>`;
    }

    correctAnswer = parseFloat(correctAnswer.toFixed(2)); // จัดการจุดทศนิยมให้แม่นยำ 
}

function checkAnswer() {
    const userVal = parseFloat(document.getElementById('user-answer').value);
    const scoreText = document.getElementById('score-val');

    if (userVal === correctAnswer) {
        score += 10;
        alert("ถูกต้อง! พลังของดอกเบี้ยทบต้นสุดยอดไปเลย 🎉");
    } else {
        alert(`คำตอบที่ถูกต้องคือ ${correctAnswer.toLocaleString()} บาท ลองคำนวณใหม่อีกครั้งนะ!`);
    }
    scoreText.innerText = score;
}
function checkAnswer() {
    const userVal = parseFloat(document.getElementById('user-answer').value);
    const scoreText = document.getElementById('score');
    const p = parseFloat(document.getElementById('principal').value);
    const r = parseFloat(document.getElementById('rate').value);
    const n = parseFloat(document.getElementById('years').value);
    const mode = document.getElementById('mode').value;
    const solutionBox = document.getElementById('solution-box');
    const solutionStep = document.getElementById('solution-step');

    solutionBox.style.display = 'block'; // แสดงกล่องเฉลย

    if (userVal === correctAnswer) {
        score += 10;
        solutionStep.innerHTML = `<span style="color:green">ถูกต้อง!</span><br>`;
    } else {
        solutionStep.innerHTML = `<span style="color:red">ยังไม่ถูกนะ ลองดูวิธีคิดด้านล่าง:</span><br>`;
    }

    // สร้างเนื้อหาวิธีทำแบบละเอียด
    if (mode === "simple") {
        solutionStep.innerHTML += `
            <b>โหมดดอกเบี้ยคงต้น</b><br>
            1. จากสูตร <span class="step-highlight">A = P(1 + nr)</span><br>
            2. แทนค่า: A = ${p.toLocaleString()}(1 + (${n} × ${r}))<br>
            3. คำนวณในวงเล็บ: 1 + ${(n * r).toFixed(2)} = ${(1 + n * r).toFixed(2)}<br>
            4. ผลลัพธ์: ${p.toLocaleString()} × ${(1 + n * r).toFixed(2)} = <span class="step-highlight">${correctAnswer.toLocaleString()} บาท</span>
        `;
    } else {
        solutionStep.innerHTML += `
            <b>โหมดดอกเบี้ยทบต้น</b><br>
            1. จากสูตร <span class="step-highlight">A = P(1 + r)ⁿ</span><br>
            2. แทนค่า: A = ${p.toLocaleString()}(1 + ${r})^${n}<br>
            3. คำนวณฐาน: (1 + ${r}) = ${(1 + parseFloat(r)).toFixed(2)}<br>
            4. คำนวณเลขยกกำลัง: ${(1 + parseFloat(r)).toFixed(2)}^${n} ≈ ${(Math.pow(1 + parseFloat(r), n)).toFixed(4)}<br>
            5. ผลลัพธ์: ${p.toLocaleString()} × ${(Math.pow(1 + parseFloat(r), n)).toFixed(4)} = <span class="step-highlight">${correctAnswer.toLocaleString()} บาท</span>
        `;
    }
    
    scoreText.innerText = score;
}
