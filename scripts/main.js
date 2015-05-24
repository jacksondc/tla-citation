$('document').ready(function() {
  $('.final-section').hide();
  $('body').on('input', 'input', buildCitation);
  $('body').on('change', 'input', buildCitation);
});

function endWithPeriod(s) {
  if(s.length > 0) {
    if(s.endsWith("\""))
      s = s.substring(0, s.length - 1) + ".\"";
    else
      s += ".";
    return s;
  } else {
    return "";
  }
}

function joinWithSpaces() { //ensures only one space in a row if blank arguments
  var s = "";
  for (var i = 0; i < arguments.length; i++) {
    if((i-1) >= 0 && arguments[i-1]) {
      s += " ";
    }
    s += arguments[i];
  }
  return s;
}

function getEventPhrase(container) {
  var action = $(container).find('input[name=action]').val();
  var month = $(container).find('input[name=month]').val();
  var day = $(container).find('input[name=day]').val();
  var year = $(container).find('input[name=year]').val();
  var place = $(container).find('input[name=place]').val();
  var biggerWork = $(container).find('input[name=bigger-work]').val();
  var isLong = $(container).find('input[name=long-bigger-work]').is(':checked');

  var eventPhrase = "";

  eventPhrase += action;

  if(day && month && year)
    eventPhrase += " on " + month + " " + day + ", " + year;
  else if(!day && month && year)
    eventPhrase += " " + month + " " + year;
  else if(year)
    eventPhrase += " " + year;
  if(place)
    eventPhrase += " at " + place;
  if(biggerWork)
    eventPhrase += " in " + wrapTitle(isLong, biggerWork);

  eventPhrase = endWithPeriod( eventPhrase );

  if(!action || (!year && !place && !biggerWork)) //not valid
    eventPhrase = "";

  return eventPhrase;
}

function wrapTitle(isLong, title) {
  return isLong ? "<i>" + title + "</i>" : "\"" + title + "\"";
}

var eventCount = 0;
$('#addEvent').click(function() {
  eventCount++;
  $("#events").append("<div class='event'><h3>Event " + eventCount + "</h3>" + $("#eventTemplate").html() + "</div>");
});

function buildCitation() {
  var id = $('input[name=id]').val();
  var title = $('input[name=title]').val();
  var isLong = $('input[name=long]').is(':checked');
  var creator = $('input[name=creator]').val();

  var idPhrase = "";
  if(id)
    idPhrase = id + ":";

  var titlePhrase = "";
  if(title)
    titlePhrase += wrapTitle(isLong, title);
  if(title && creator)
    titlePhrase += " by ";
  if(creator)
    titlePhrase += creator;
  if(title || creator)
    titlePhrase = endWithPeriod(titlePhrase);

  var eventPhrases = [];
  $(".event").each(function() {
    eventPhrases.push(getEventPhrase(this));
  });
  var eventPhrase = joinWithSpaces(eventPhrases);

  var citation = joinWithSpaces(idPhrase, titlePhrase, eventPhrase);
  if(citation.length > 0) {
    $('.final').html(citation);
    $('.final-section').show();
  } else {
    $('.final-section').hide();
  }
};