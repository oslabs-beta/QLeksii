

const ch = document.getElementById('togBtn');
const darkSide = document.getElementById('darkSide');
ch.addEventListener('change', async() => {
   if(ch.checked){
        const isDarkMode = await window.darkMode.toggle()
   }
   if(!ch.checked){
         await window.darkMode.system()
   }

})

darkSide.addEventListener('click', async() => {
  await window.darkMode.switch()

})