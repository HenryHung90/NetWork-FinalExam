var _scheduleFinal = [] //存取所有scheduleContent的陣列

function _showOnSchedule() {
    let api = "http://127.0.0.1:3000/memberAPI/showSchedule"
    $.get(api, function(data) {
        console.log("讀取完整班表成功");
        _arraySchedule(data);
    });
}

function _arraySchedule(data) {
    _sceduleContent = { title: data[0][1][0], start: "2022-01-10" };
    for (let i = 1; i < Object.keys(data[0]).length - 7; i++) {
        for (let j = 0; j < Object.keys(data[0][i]).length; j++) {
            let _i = i
            if (i < 10) _i = "0" + i;
            _sceduleContent = { title: data[0][i][j], start: "2022-01-" + _i }
            _scheduleFinal.push(_sceduleContent);
        }
    };
    //--------------------生成Calendar------------------
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid'],
        defaultDate: '2022-01-06',
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: _scheduleFinal,
    });
    calendar.render();
    let content = `
                <button type="button" class="fc-button fc-button-primary" onclick="test()">Test</button>
                <button type="button" class="fc-button fc-button-primary" onclick="AutoSchedule()">AutoSchedule</button>
            `
    $('h2').css('color', 'white');
    $('.fc-view-container').css('background-color', 'lightcyan')
    $('.fc-today-button.fc-button.fc-button-primary').before(content);
    //--------------------------------------------------------------------
    console.log(_scheduleFinal);
    console.log(data);
}