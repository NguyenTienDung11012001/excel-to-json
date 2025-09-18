/* script.js - Excel to JSON (client-side) */


const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const convertBtn = document.getElementById('convert-btn');
const downloadBtn = document.getElementById('download-btn');
const jsonPreview = document.getElementById('json-preview');
const sheetSelect = document.getElementById('sheet-select');
const headerFirstRowCheckbox = document.getElementById('header-first-row');


let workbook = null;
let currentJson = null;
let currentFilename = 'data.json';

// Helpers
function enableControls(hasWorkbook) {
    convertBtn.disabled = !hasWorkbook;
    sheetSelect.style.display = hasWorkbook ? 'inline-block' : 'none';
}


function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        try {
            // read as binary string or array buffer
            workbook = XLSX.read(data, { type: 'array' });
            populateSheetList(workbook.SheetNames);
            enableControls(true);
            jsonPreview.value = `Loaded ${file.name} — ${workbook.SheetNames.length} sheet(s) found.`;
            currentFilename = file.name.replace(/\.[^/.]+$/, '') + '.json';
        } catch (err) {
            console.error(err);
            alert('Không thể đọc file Excel. Hãy chắc chắn file hợp lệ.');
            enableControls(false);
        }
    };
    reader.onerror = (err) => {
        console.error(err);
        alert('Lỗi khi đọc file.');
        enableControls(false);
    };
    // read as array buffer which is more reliable
    reader.readAsArrayBuffer(file);
}

function populateSheetList(names) {
    sheetSelect.innerHTML = '';
    names.forEach((n, i) => {
        const opt = document.createElement('option');
        opt.value = n;
        opt.textContent = `${i + 1}: ${n}`;
        sheetSelect.appendChild(opt);
    });
}


function convertSelectedSheet() {
    if (!workbook) return;
    const sheetName = sheetSelect.value || workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const opts = { defval: '' };
    if (!headerFirstRowCheckbox.checked) {
        // if first row is not header, instruct sheet_to_json to use header:1 and then map
        const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        // raw is array of arrays, we will convert to objects with generated keys
        const keys = raw[0] && raw[0].length ? raw[0].map((_, i) => `col_${i + 1}`) : [];
        const rows = raw.slice(1).map(r => {
            const obj = {};
            for (let i = 0; i < keys.length; i++) obj[keys[i]] = r[i] === undefined ? '' : r[i];
            return obj;
        });
        currentJson = rows;
    } else {
        currentJson = XLSX.utils.sheet_to_json(sheet, opts);
    }


    const pretty = JSON.stringify(currentJson, null, 2);
    jsonPreview.value = pretty;
    downloadBtn.disabled = false;
}

function downloadJSON() {
    if (!currentJson) return;
    const blob = new Blob([JSON.stringify(currentJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}


// Events
fileInput.addEventListener('change', (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (f) handleFile(f);
});


// drag & drop
['dragenter', 'dragover'].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
});
['dragleave', 'drop'].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); });
});


dropZone.addEventListener('drop', (e) => {
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
});


convertBtn.addEventListener('click', () => {
    convertSelectedSheet();
});


downloadBtn.addEventListener('click', () => {
    downloadJSON();
});


// initial state
enableControls(false);