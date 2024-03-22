<html>
<style>
      table,
      th,
      td {
        padding: 10px;
        border: 1px solid black;
        border-collapse: collapse;
      }
</style>

<head>
<title>Catalogue WoodyToys</title>
</head>

<body>
<h1>Catalogue WoodyToys</h1>

<?php
$dbname = 'woodytoys';
$dbuser = 'root';
$dbpass = 'mypass';
$dbhost = 'db';
$connect = mysqli_connect($dbhost, $dbuser, $dbpass) or die("Unable to connect to '$dbhost'");
mysqli_select_db($connect,$dbname) or die("Could not open the database '$dbname'");
$result = mysqli_query($connect,"SELECT id, name, price FROM products");
?>

<table>
<tr>
    <th>Numéro de produit</th>
    <th>Descriptif</th> 
    <th>Prix</th>
</tr>
<?php
while ($row = mysqli_fetch_array($result)) {
        printf("<tr><th>%s</th> <th>%s</th> <th>%s</th></tr>", $row['id'], $row['name'], $row['price']);

}
?>

</table>
</body>
</html>