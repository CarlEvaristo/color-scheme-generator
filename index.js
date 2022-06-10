const colorPicker = document.getElementById("color-picker")
const colorMode = document.getElementById("color-mode")
const submitBtn = document.getElementById("submit-btn")
const overlay = document.getElementById("overlay")
const modal = document.getElementById("modal")
overlay.addEventListener("click", () => overlay.style.display = "none")

setTimeout(()=>{submitBtn.click()},1000)

const columnWrapper = document.getElementById("columns")
columnWrapper.classList.add("color-field")

function showModal(value) {
    navigator.clipboard.writeText(value)
    overlay.style.display = "inline"
    modal.innerHTML = `
    <h3>Copied color value<br>${value}</h3>
    `
    setTimeout(()=>{overlay.style.display = "none"},1000)
}

let isFirstVisit = true

function buttonHandler() {
    columnWrapper.innerHTML = ""
    let hex = colorPicker.value.substring(1)
    columnWrapper.classList.remove("color-field")
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${colorMode.value}&count=5`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(color => {
                columnWrapper.innerHTML += `
                        <div 
                            title="click me to copy color ${color.hex.value}" 
                            class="color-field" 
                            style="background:${color.hex.value}" 
                            onclick="showModal('${color.hex.value}')"   
                            >
                                <p class="color-code">${color.hex.value}</p>
                        </div>
                `
            })
        })
    if (isFirstVisit) {
        overlay.style.display = "inline"
        isFirstVisit = false
    } 
}

submitBtn.addEventListener("click", buttonHandler)


