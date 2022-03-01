// $("h1").click(function() {
//   $("h1").css("color", "purple");
// })

$("button").click(function() {
  $("h1").slideUp().slideDown().animate({opacity: 0.5, margin: "10%"});
  // $("h1").animate({
  //
  //   margin: "20%"
  // });
})

$("input").keypress(function() {
  var k = event.key;
  $("h1").text(k);
  // alert(k + " is pressed@");
})


$("h1").on("mouseover", function() {
  $("h1").css("color", "purple");
})

$("h1").on("mouseout", function() {
  $("h1").css("color", "black");
})

$("h1").before("<button>New Button</button>");

$("button").remove(".drum");
