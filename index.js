document.addEventListener('DOMContentLoaded', function () {
    $("#form-items").sortable();

    function addElement(eleName) {
        const listEl = document.createElement('li');
        const listDiv = document.createElement('div');
        listDiv.classList.add("form-item");
        const labelDiv = document.createElement('div');
        labelDiv.classList.add("form-item-label-container");
        const label = document.createElement('label');
        label.textContent = "Sample Label";
        label.classList.add("form-item-label");
        const del = document.createElement('button');
        del.classList.add("form-item-del");
        del.innerHTML = '<i class="fa-solid fa-trash"></i>';

        labelDiv.appendChild(label);
        labelDiv.appendChild(del);
        const ele = document.createElement(eleName);
        ele.classList.add("form-item-element");

        if (eleName === "textarea") {
            label.textContent = "Text area";
            ele.classList.add("form-item-element-text");
        }
        if (eleName === "select") {
            label.textContent = "Select";
            const opt1 = document.createElement('option');
            opt1.textContent = "Sample Option 1";
            ele.appendChild(opt1);
            const opt2 = document.createElement('option');
            opt2.textContent = "Sample Option 2";
            ele.appendChild(opt2);
        }

        listDiv.appendChild(labelDiv);
        listDiv.appendChild(ele);
        listEl.appendChild(listDiv);
        document.getElementById("form-items").appendChild(listEl);

        // Adding event listener for the delete button
        del.addEventListener("click", () => {
            listEl.remove();
        });
    }

    function save() {
        const formData = Array.from(document.getElementById('form-items').children).map(item => {
            const label = item.querySelector('.form-item-label').textContent;
            const type = item.querySelector('.form-item-element').tagName.toLowerCase();
            const id = generateUUID();
            const placeholder = '';

            return {
                id,
                type,
                label,
                placeholder
            };
        });

        const jsonData = JSON.stringify(formData, null, 2);
        console.log(jsonData);
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    document.getElementById("add-input").addEventListener("click", () => addElement("input"));
    document.getElementById("add-select").addEventListener("click", () => addElement("select"));
    document.getElementById("add-textarea").addEventListener("click", () => addElement("textarea"));
    document.getElementById("save-btn").addEventListener("click", save); // Updated this line
});
