(function($) {
    "use strict";
    var $wrapper = $('.main-wrapper');
    var $pageWrapper = $('.page-wrapper');
    var $slimScrolls = $('.slimscroll');
    var Sidemenu = function() {
        this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
        var $this = Sidemenu;
        $('#sidebar-menu a').on('click', function(e) {
            if ($(this).parent().hasClass('submenu')) {
                e.preventDefault();
            }
            if (!$(this).hasClass('subdrop')) {
                $('ul', $(this).parents('ul:first')).slideUp(350);
                $('a', $(this).parents('ul:first')).removeClass('subdrop');
                $(this).next('ul').slideDown(350);
                $(this).addClass('subdrop');
            } else if ($(this).hasClass('subdrop')) {
                $(this).removeClass('subdrop');
                $(this).next('ul').slideUp(350);
            }
        });
        $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }
    init();
    $('body').append('<div class="sidebar-overlay"></div>');
    $(document).on('click', '#mobile_btn', function() {
        $wrapper.toggleClass('slide-nav');
        $('.sidebar-overlay').toggleClass('opened');
        $('html').toggleClass('menu-opened');
        return false;
    });
    $(".sidebar-overlay").on("click", function() {
        $wrapper.removeClass('slide-nav');
        $(".sidebar-overlay").removeClass("opened");
        $('html').removeClass('menu-opened');
    });
    if ($('.page-wrapper').length > 0) {
        var height = $(window).height();
        $(".page-wrapper").css("min-height", height);
    }
    $(window).resize(function() {
        if ($('.page-wrapper').length > 0) {
            var height = $(window).height();
            $(".page-wrapper").css("min-height", height);
        }
    });
    if ($('.select').length > 0) {
        $('.select').select2({
            minimumResultsForSearch: -1,
            width: '100%'
        });
    }
    if ($('.datetimepicker').length > 0) {
        $('.datetimepicker').datetimepicker({
            format: 'DD-MM-YYYY',
            icons: {
                up: "fas fa-angle-up",
                down: "fas fa-angle-down",
                next: 'fas fa-angle-right',
                previous: 'fas fa-angle-left'
            }
        });
    }
    if ($('.bookingrange').length > 0) {
        var start = moment().subtract(6, 'days');
        var end = moment();

        function booking_range(start, end) {
            $('.bookingrange span').html(start.format('M/D/YYYY') + ' - ' + end.format('M/D/YYYY'));
        }
        $('.bookingrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, booking_range);
        booking_range(start, end);
    }
    if ($('.datatable').length > 0) {
        $('.datatable').DataTable({
            language: {
                search: '<i class="fas fa-search"></i>',
                searchPlaceholder: "Search"
            }
        });
    }
    if ($slimScrolls.length > 0) {
        $slimScrolls.slimScroll({
            height: 'auto',
            width: '100%',
            position: 'right',
            size: '7px',
            color: '#ccc',
            allowPageScroll: false,
            wheelStep: 10,
            touchScrollStep: 100
        });
        var wHeight = $(window).height() - 60;
        $slimScrolls.height(wHeight);
        $('.sidebar .slimScrollDiv').height(wHeight);
        $(window).resize(function() {
            var rHeight = $(window).height() - 60;
            $slimScrolls.height(rHeight);
            $('.sidebar .slimScrollDiv').height(rHeight);
        });
    }
    if ($('.toggle-password').length > 0) {
        $(document).on('click', '.toggle-password', function() {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $(".pass-input");
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    }
    $(document).on('click', '#check_all', function() {
        $('.checkmail').click();
        return false;
    });
    if ($('.checkmail').length > 0) {
        $('.checkmail').each(function() {
            $(this).on('click', function() {
                if ($(this).closest('tr').hasClass('checked')) {
                    $(this).closest('tr').removeClass('checked');
                } else {
                    $(this).closest('tr').addClass('checked');
                }
            });
        });
    }
    $(document).on('click', '.mail-important', function() {
        $(this).find('i.fa').toggleClass('fa-star').toggleClass('fa-star-o');
    });
    $(document).on('click', '#toggle_btn', function() {
        if ($('body').hasClass('mini-sidebar')) {
            $('body').removeClass('mini-sidebar');
            $('.subdrop + ul').slideDown();
        } else {
            $('body').addClass('mini-sidebar');
            $('.subdrop + ul').slideUp();
        }
        setTimeout(function() {
            mA.redraw();
            mL.redraw();
        }, 300);
        return false;
    });
    $(document).on('mouseover', function(e) {
        e.stopPropagation();
        if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
            var targ = $(e.target).closest('.sidebar').length;
            if (targ) {
                $('body').addClass('expand-menu');
                $('.subdrop + ul').slideDown();
            } else {
                $('body').removeClass('expand-menu');
                $('.subdrop + ul').slideUp();
            }
            return false;
        }
    });
    $(document).on('click', '#filter_search', function() {
        $('#filter_inputs').slideToggle("slow");
    });
    if ($('.custom-file-container').length > 0) {
        var firstUpload = new FileUploadWithPreview('myFirstImage')
        var secondUpload = new FileUploadWithPreview('mySecondImage')
    }
    if ($('.clipboard').length > 0) {
        var clipboard = new Clipboard('.btn');
    }
    if ($('#summernote').length > 0) {
        $('#summernote').summernote({
            height: 300,
            minHeight: null,
            maxHeight: null,
            focus: true
        });
    }
    if ($('#editor').length > 0) {
        ClassicEditor.create(document.querySelector('#editor'), {
            toolbar: {
                items: ['heading', '|', 'fontfamily', 'fontsize', '|', 'alignment', '|', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|', 'link', '|', 'outdent', 'indent', '|', 'bulletedList', 'numberedList', 'todoList', '|', 'code', 'codeBlock', '|', 'insertTable', '|', 'uploadImage', 'blockQuote', '|', 'undo', 'redo'],
                shouldNotGroupWhenFull: true
            }
        }).then(editor => {
            window.editor = editor;
        }).catch(err => {
            console.error(err.stack);
        });
    }
    if ($('[data-bs-toggle="tooltip"]').length > 0) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }
    if ($('.popover-list').length > 0) {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        })
    }
    if ($('.counter').length > 0) {
        $('.counter').counterUp({
            delay: 20,
            time: 2000
        });
    }
    if ($('#timer-countdown').length > 0) {
        $('#timer-countdown').countdown({
            from: 180,
            to: 0,
            movingUnit: 1000,
            timerEnd: undefined,
            outputPattern: '$day Day $hour : $minute : $second',
            autostart: true
        });
    }
    if ($('#timer-countup').length > 0) {
        $('#timer-countup').countdown({
            from: 0,
            to: 180
        });
    }
    if ($('#timer-countinbetween').length > 0) {
        $('#timer-countinbetween').countdown({
            from: 30,
            to: 20
        });
    }
    if ($('#timer-countercallback').length > 0) {
        $('#timer-countercallback').countdown({
            from: 10,
            to: 0,
            timerEnd: function() {
                this.css({
                    'text-decoration': 'line-through'
                }).animate({
                    'opacity': .5
                }, 500);
            }
        });
    }
    if ($('#timer-outputpattern').length > 0) {
        $('#timer-outputpattern').countdown({
            outputPattern: '$day Days $hour Hour $minute Min $second Sec..',
            from: 60 * 60 * 24 * 3
        });
    }
    var chatAppTarget = $('.chat-window');
    (function() {
        if ($(window).width() > 991)
            chatAppTarget.removeClass('chat-slide');
        $(document).on("click", ".chat-window .chat-users-list a.media", function() {
            if ($(window).width() <= 991) {
                chatAppTarget.addClass('chat-slide');
            }
            return false;
        });
        $(document).on("click", "#back_user_list", function() {
            if ($(window).width() <= 991) {
                chatAppTarget.removeClass('chat-slide');
            }
            return false;
        });
    })();
    $('.app-listing .selectbox').on("click", function() {
        $(this).parent().find('#checkboxes').fadeToggle();
        $(this).parent().parent().siblings().find('#checkboxes').fadeOut();
    });
    $('.invoices-main-form .selectbox').on("click", function() {
        $(this).parent().find('#checkboxes-one').fadeToggle();
        $(this).parent().parent().siblings().find('#checkboxes-one').fadeOut();
    });
    if ($('.sortby').length > 0) {
        var show = true;
        var checkbox1 = document.getElementById("checkbox");
        $('.selectboxes').on("click", function() {
            if (show) {
                checkbox1.style.display = "block";
                show = false;
            } else {
                checkbox1.style.display = "none";
                show = true;
            }
        });
    }
    $(function() {
        $("input[name='invoice']").click(function() {
            if ($("#chkYes").is(":checked")) {
                $("#show-invoices").show();
            } else {
                $("#show-invoices").hide();
            }
        });
    });
    $(".links-info-one").on('click', '.service-trash', function() {
        $(this).closest('.links-cont').remove();
        return false;
    });
    $(document).on("click", ".add-links", function() {
        var experiencecontent = '<div class="links-cont">' +
            '<div class="service-amount">' +
            '<a href="#" class="service-trash"><i class="fe fe-minus-circle me-1"></i>Service Charge</a> <span>$4</span' +
            '</div>' +
            '</div>';
        $(".links-info-one").append(experiencecontent);
        return false;
    });
    $(".links-info-discount").on('click', '.service-trash-one', function() {
        $(this).closest('.links-cont-discount').remove();
        return false;
    });
    $(document).on("click", ".add-links-one", function() {
        var experiencecontent = '<div class="links-cont-discount">' +
            '<div class="service-amount">' +
            '<a href="#" class="service-trash-one"><i class="fe fe-minus-circle me-1"></i>Offer new</a> <span>$4 %</span' +
            '</div>' +
            '</div>';
        $(".links-info-discount").append(experiencecontent);
        return false;
    });
    $(".add-table-items").on('click', '.remove-btn', function() {
        $(this).closest('.add-row').remove();
        return false;
    });
})(jQuery);