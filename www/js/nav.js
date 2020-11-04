function home() {
    const res = GetRes("I-RateRes")
    res.onsuccess = (event) => {
        const results = event.target.result
        for (var i in results.reverse()) {
            let html = `
            <li>
                <div class="card-group vgr-cards">
                    <div class="card">
                        <div class="card-img-body">
                            <img id="GetDetailsRes" rateId="${results[i].id}" data-toggle="modal" data-target="#detail" class="card-img" src="${results[i].image}" alt="Card image cap" height="200px" width="380px">
                        </div>
                        <div class="card-body">
                            <a id="GetDetailsRes" rateId="${results[i].id}" data-toggle="modal" data-target="#detail">
                                <h4 class="card-title">${results[i].Restaurant_Name}</h4>
                            </a>
                            <p class="card-text">${results[i].Restaurant_Type}</p>
                            <a id="DeleteRes" rateId="${results[i].id}" class="btn btn-outline-primary">Delete</a>
                        </div>
                    </div>
                </div>
            </li>
            `
            $('#listrest').append(html);
        }
    }
}
$(document).ready(function () {
    $('#rate-view').on('click', function () {
        location.href = "test.html"
    })
    $('#backhome').on('click', function () {
        location.href = "index.html";
        home();
    })
    $('#rate-form').on('submit', function () {
        const rate = {
            Restaurant_Name: $('#Restaurant_Name').val(),
            Restaurant_Type: $('#Restaurant_Type').val(),
            Restaurant_Address: $('#Restaurant_Address').val(),
            Service_Rate: $('#Service_Rate').val(),
            Clean_Rate: $('#Clean_Rate').val(),
            Food_Rate: $('#Food_Rate').val(),
            Price: $('#Price').val(),
            Date: $('#Date').val(),
            Notes: $('#Notes').val(),
        }
        console.log(rate)
        AddRes("I-RateRes", rate)
        return false
    })
    $(document).on('click', '#DeleteRes', function () {
        const rateid = $(this).attr("rateId")
        const result = DeleteRes(Number(rateid))
        result.onsuccess = function () {
            $('#listrest').empty()
            navigator.notification.beep(1);
            navigator.vibrate(100)
            home()
        }
    })
    $(document).on('click', '#GetDetailsRes', function () {
        const rateId = $(this).attr("rateId")
        const result = GetDetailsRes(rateId)
        result.onsuccess = function (event) {
            $(location).attr('href', "#detail")
            const Restaurant_Detail = event.target.result
            const html = `
            <div class="modal-dialog" role="document">
                <div class="">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${Restaurant_Detail.Restaurant_Name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="card-title">${Restaurant_Detail.Restaurant_Name}</h4>
                    <p class="card-text">${Restaurant_Detail.Restaurant_Type}</p>

                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-secondary" data-dismiss="modal" href="#home">Close</button>
                </div>
                </div>
            </div>
            `
            $('#detail').empty().append(html)
        }
    })
})