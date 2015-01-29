//= require jquery
//= require jquery_ujs
//= require_tree ./lib
//= require_tree ./redactor-rails


var $editor1 = $('#editor1'),
    $editor2 = $('#editor2'),
    $diff_display = $('#diff-display');

function html1() {
  return $editor1.val();
}

function html2() {
  return $editor2.val();
}

function text1() {
  return getInnerText(html1());
}

function text2() {
  return getInnerText(html2());
}


// Reference: http://jsfiddle.net/wv49v/32/#
function getInnerText(text) {

    $('body').append($('<div id="temp">' + text + '</div>'));
    var $temp = $('#temp');
    var el = $temp[0];

    var sel, range, innerText = "";
    if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
        range = document.body.createTextRange();
        range.moveToElementText(el);
        innerText = range.text;
    } else if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        sel = window.getSelection();
        sel.selectAllChildren(el);
        innerText = "" + sel;
        sel.removeAllRanges();
    }

    $temp.remove();
    return innerText;
}


var dmp = new diff_match_patch();
function render_dmp(lhs, rhs) {
  var d = dmp.diff_main(lhs, rhs);
  dmp.diff_cleanupSemantic(d);
  var ds = dmp.diff_prettyHtml(d);
  $diff_display.html(ds);
}


var $remote_diff_result = $('#remote-diff-result');

$('#remote-diff').click(function(event) {

  $remote_diff_result.maskLoading()
  $.post("/diff/html", { html1: html1(), html2: html2() } )
    .done(function(data, textStatus, jqXHR) { $remote_diff_result.html(data); })
    .fail(function() { alert("some shit done broke."); })
    .always(function() { $remote_diff_result.unmaskLoading(); });

});
