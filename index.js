const colorPicker = document.getElementById("color-picker")
const colorMode = document.getElementById("color-mode")
const submitBtn = document.getElementById("submit-btn")
const overlay = document.getElementById("overlay")

overlay.addEventListener("click", () => overlay.style.display = "none")

setTimeout(()=>{submitBtn.click()},1000)

const columnWrapper = document.getElementById("columns")
columnWrapper.classList.add("color-field")

function copyClipboard(value) {
    navigator.clipboard.writeText(value);
}

let isFirstVisit = true

function buttonHandler() {
    let hex = colorPicker.value.substring(1)
    columnWrapper.classList.remove("color-field")
    columnWrapper.innerHTML = ""
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${colorMode.value}&count=5`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(color => {
                columnWrapper.innerHTML += `
                        <div 
                            title="click me to copy color ${color.hex.value}" 
                            class="color-field" 
                            style="background:${color.hex.value}" 
                            onclick="navigator.clipboard.writeText('${color.hex.value}')"
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


