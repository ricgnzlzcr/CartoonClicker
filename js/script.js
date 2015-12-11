$(document).ready(function() {
    var model = {
        init: function() {
            var fred = new model.Cartoon("Fred Flinstone", "fred", 0);
            var george = new model.Cartoon("George Jetson", "george", 0);
            var donald = new model.Cartoon("Donald Duck", "donald", 0);
            var spongebob = new model.Cartoon("Spongebob", "spongebob", 0);
            var tommy = new model.Cartoon("Tommy Pickles", "tommy", 0);
            model.cartoons = [fred, george, donald, spongebob, tommy];
            model.currToon = tommy;
        },
        Cartoon: function(name, id, clicks) {
            this.name = name;
            this.id = id;
            this.clicks = clicks;
        },
        currToon: {},
        divHtml: '<div class="toon"><h3>%name%</h3><span class="counter">%clicks%</span> clicks<br><img class="clicker" src="img/%id%.jpg"></div>',
        cartoons: []
    };

    var controller = {
        init: function() {
            model.init();
            buttonView.init();
            toonView.init();

            //Setup listeners
            $('#toonlist').on('click', 'button', function() {

                //Find out what toon was clicked
                var btnClicked = $(this).context.id;
                btnClicked = btnClicked.replace("button", "");
                btnClicked = Number.parseInt(btnClicked);

                model.currToon = model.cartoons[btnClicked];
                toonView.render();
            });

            $('.toon').on('click', function() {
                //Adds a click to current object and redraws the toonView
                ++model.currToon.clicks;
                toonView.render();
            });
        }
    };

    var buttonView = {
        init: function() {
            var buttonList = $('#toonlist');
            for (var i = 0; i < model.cartoons.length; i++) {
                var toon = model.cartoons[i];
                var btn = buttonView.buttonHTML.replace('%btnNum%', i).replace('%name%', toon.name);
                buttonList.append(btn);
            }
        },
        buttonHTML: '<button id="button%btnNum%">%name%</button>'
    };

    var toonView = {
        init: function() {
            if (model.cartoons.length > 0) {
                model.currToon = model.cartoons[0];
            }
            toonView.render();
        },
        viewerHTML: '<h3>%name%</h3><span class="counter">%clicks%</span> clicks<br><img class="clicker" src="img/%id%.jpg">',
        render: function() {
            //remove previous toon
            $('.toon').html("");

            //Add current toon to screen
            var currToon = model.currToon;
            var toonHTML = toonView.viewerHTML.replace("%clicks%", currToon.clicks).replace("%id%", currToon.id).replace("%name%", currToon.name);
            $('.toon').append(toonHTML);
        }
    };

    controller.init();
}); 

