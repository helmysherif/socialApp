function getID(id)
{
    document.getElementById("delete").value = id;
}
function edit(id)
{
    let titleText = document.getElementById("title" + id).innerText
    let descText = document.getElementById("desc" + id).innerText
    document.getElementById("titleInput").value = titleText
    document.getElementById("descInput").value = descText
    document.getElementById("idInput").value = id;
}