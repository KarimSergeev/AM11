const canvas = document.getElementById("matrix");
const cntx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

cntx.font = "20px monospace";

const words = ["Anna-Mariya ", "Монголка ", "Малышка ", "Любимая ", "СамаяЛучшаяДевушка "];
const message = "Анна-Мария, с всеримным женским праздником! К сожалению меня нету рядом, чтобы\nя мог тебя всячески восхвалять и превозносить, поэтому я постарался сделать\nоткрытку, которая передаст хоть чуточку моей любви. Спасибо, что ты есть в\nмоей жизни! Твоя женская теплота и ласка дарят мне покой и застваляют улыбаться\nпри воспоминании о тебе) Ты мне очень доорга, с 8 марта тебя!\n  от Круглика-Бублика <3";

const numColumns = Math.floor(canvas.width / 20);
const columns = Array.from({length: numColumns}, () => ({
    y: Math.floor(Math.random() * canvas.height),
    wordIndex: Math.floor(Math.random() * (words.length - 1)),
    letterIndex: 0
}));

const messageFrame = 100;
const fpl = 2;
let frameCount = 0;

function drawMessage(ctx, text, cx, cy, font, textColor, boxColor, padding, lineHeightMult) {
    ctx.save();
    ctx.font = font;
  
    const lines = text.split('\n');
  
    let maxWidth = 0;
    for (let line of lines) {
      const lineWidth = ctx.measureText(line).width;
      if (lineWidth > maxWidth) {
        maxWidth = lineWidth;
      }
    }
  
    const fontSize = parseInt(font, 10) || 20;
    const lineHeight = fontSize * lineHeightMult; 
  
    const boxWidth = maxWidth + padding * 2;
    const boxHeight = lines.length * lineHeight + padding * 2;
  
    const boxX = cx - boxWidth / 2;
    const boxY = cy - boxHeight / 2;
  
    ctx.fillStyle = boxColor;
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
  
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
  
    let yPos = boxY + padding; 
    for (let line of lines) {
      ctx.fillText(line, cx, yPos);
      yPos += lineHeight;
    }
  
    ctx.restore();
  }

setInterval(() => {
    cntx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    cntx.fillRect(0, 0, canvas.width, canvas.height);
  
    cntx.fillStyle = 'rgb(234, 15, 15)';

    for (let i = 0; i < numColumns; i++)
    {
        const col = columns[i];

        const currentWord = words[col.wordIndex];
        const curretnLetter = currentWord[col.letterIndex];

        cntx.fillText(curretnLetter, i * 20, col.y);
        
        if (frameCount % fpl === 0)
        {
            col.y += 20;
            if (col.y > canvas.height)
            {
                col.y = 0;
            }
            
            col.letterIndex++;
            if (col.letterIndex >= currentWord.length)
            {
                col.letterIndex = 0;
                col.wordIndex = Math.floor(Math.random() * (words.length - 1));
            }
        }
    }

    if (frameCount > messageFrame)
        {
            drawMessage(cntx, message, canvas.width/2, canvas.height/2, cntx.font, "rgb(255, 255, 255)", "rgba(0,0,0,0.5)", 20, 1.3)
        }

    frameCount++;
  
  }, 33);