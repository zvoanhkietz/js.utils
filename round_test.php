<?php
if (isset($_GET['num'])) {
    $num = (float)$_GET['num'];
    echo round($num, 2);
    die;
}
?>

<!DOCTYPE html>
<html>

<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>

<body>
    <div class="result"><span class="failed">0</span>/<span class="count">0</span></div>
    <div class="table-failed">
        <table>
            <thead>
                <tr>
                    <th>js</th>
                    <th>php</th>
                    <th>num</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="/round.js"></script>
<script>
    var count = 0;
    var failed = 0;
    setInterval(() => {
        (async () => {
            const num = Math.random() * 1000;
            const js = round(num, 2);
            const php = parseFloat(await $.get(`http://localhost:8080/index.php?num=${num}`));
            count++;
            if (php !== js) {
                failed++;
                $('.table-failed').prepend(`<tr>
                    <td>${js}</td>
                    <td>${php}</td>
                    <td>${num}</td>
                </tr>`);
            }

            $('.result .failed').text(failed);
            $('.result .count').text(count);
        })();
    }, 50);
</script>

</html>
