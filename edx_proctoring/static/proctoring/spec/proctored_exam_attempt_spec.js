describe('ProctoredExamAttemptView', function() {
    'use strict';

    var html = '';
    var deletedProctoredExamAttemptJson = [{
        attempt_url: '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/edX/DemoX/Demo_Course',
        proctored_exam_attempts: [],
        pagination_info: {
            current_page: 1,
            has_next: false,
            has_previous: false,
            total_pages: 1
        }

    }];
    function getExpectedProctoredExamAttemptWithAttemptStatusJson(status) {
        return (
            [{
                attempt_url: '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/edX/DemoX/Demo_Course',
                pagination_info: {
                    current_page: 1,
                    has_next: false,
                    has_previous: false,
                    total_pages: 1
                },
                proctored_exam_attempts: [{
                    allowed_time_limit_mins: 1,
                    attempt_code: '20C32387-372E-48BD-BCAC-A2BE9DC91E09',
                    completed_at: null,
                    created: '2015-08-10T09:15:45Z',
                    external_id: '40eceb15-bcc3-4791-b43f-4e843afb7ae8',
                    id: 43,
                    is_sample_attempt: false,
                    last_poll_ipaddr: null,
                    last_poll_timestamp: null,
                    modified: '2015-08-10T09:15:45Z',
                    started_at: '2015-08-10T09:15:45Z',
                    status: status,
                    taking_as_proctored: true,
                    proctored_exam: {
                        content_id: 'i4x://edX/DemoX/sequential/9f5e9b018a244ea38e5d157e0019e60c',
                        course_id: 'edX/DemoX/Demo_Course',
                        exam_name: 'Normal Exam',
                        external_id: null,
                        id: 17,
                        is_active: true,
                        is_practice_exam: false,
                        is_proctored: true,
                        time_limit_mins: 1
                    },
                    user: {
                        username: 'testuser1',
                        email: 'testuser1@test.com'
                    }
                }]
            }]
        );
    }

    beforeEach(function() {
        html = '<div class="wrapper-content wrapper">' +
        '<% var is_proctored_attempts = proctored_exam_attempts.length !== 0 %>' +
        '<section class="content">' +
        '<div class="top-header">' +
        '<div class="search-attempts">' +
        '<input type="text" id="search_attempt_id" placeholder="e.g johndoe or john.doe@gmail.com"' +
        '<% if (inSearchMode) { %> value="<%= searchText %>" <%} %>' +
        '/> <span class="search"><span class="icon fa fa-search" aria-hidden="true"></span></span> ' +
        '<span class="clear-search"><span class="icon fa fa-remove" aria-hidden="true"></span></span>' +
        '</div>' +
        '<ul class="pagination">' +
        '<% if (!pagination_info.has_previous){ %>' +
        '<li class="disabled"> <a aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li>' +
        '<% } else { %>' +
        '<li>' +
        '<a class="target-link " data-target-url="' +
        '<%- interpolate("%(attempt_url)s?page=%(count)s ",' +
        '{attempt_url: attempt_url, count: pagination_info.current_page - 1}, true) %>' +
        '"' +
        'href="#" aria-label="Previous">' +
        '<span aria-hidden="true">&laquo;</span> </a> </li> <% }%>' +
        '<% for(var n = 1; n <= pagination_info.total_pages; n++) { %>' +
        '<li> <a class="target-link <% if (pagination_info.current_page == n){ %> active <% } %>" data-target-url=" ' +
        '<%- interpolate("%(attempt_url)s?page=%(count)s ", {attempt_url: attempt_url, count: n}, true) %>' +
        '"href="#"><%= n %> </a></li> <% } %>' +
        '<% if (!pagination_info.has_next){ %>' +
        '<li class="disabled"> <a aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a></li>' +
        '<% } else { %> <li> <a class="target-link" href="#" aria-label="Next" data-target-url="' +
        '<%- interpolate("%(attempt_url)s?page=%(count)s ",' +
        '{attempt_url: attempt_url, count: pagination_info.current_page + 1}, true) %>' +
        '" > <span aria-hidden="true">&raquo;</span></a> </li> <% }%> </ul><div class="clearfix"></div></div>' +
        '<table class="exam-attempts-table"> <thead><tr class="exam-attempt-headings">' +
        '<th class="username">Username</th>' +
        '<th class="exam-name">Exam Name</th>' +
        '<th class="attempt-allowed-time">Allowed Time (Minutes)</th>' +
        '<th class="attempt-started-at">Started At</th>' +
        '<th class="attempt-completed-at">Completed At</th>' +
        '<th class="attempt-status">Status</th>' +
        '<th class="c_action">Actions</th>' +
        '</tr></thead>' +
        '<% if (is_proctored_attempts) { %>' +
        '<tbody>' +
        '<% _.each(proctored_exam_attempts, function(proctored_exam_attempt, dashboard_index){' +
        '%><tr class="allowance-items">' +
        '<td>' +
        ' <%= proctored_exam_attempt.user.username %> ' +
        ' </td>' +
        '<td>' +
        ' <%- interpolate(gettext(" %(exam_display_name)s "),' +
        '{ exam_display_name: proctored_exam_attempt.proctored_exam.exam_name }, true) %>' +
        '</td>' +
        '<td>' +
        ' <%= proctored_exam_attempt.allowed_time_limit_mins %> ' +
        '</td>' +
        '<td>' +
        ' <%= getDateFormat(proctored_exam_attempt.started_at) %>' +
        '</td>' +
        '<td>' +
        ' <%= getDateFormat(proctored_exam_attempt.completed_at) %>' +
        '</td>' +
        '<td>' +
        ' <% if (proctored_exam_attempt.status){ %> <%= proctored_exam_attempt.status %> <% } else { %> N/A  <% } %> ' +
        '</td>' +
        '<td>' +
        '<% if (proctored_exam_attempt.status){ %> ' +
        '<% if (enable_exam_resume_proctoring_improvements) { %>' +
        '<% if (proctored_exam_attempt.status == "error") { %>' +
        '<div class="wrapper-action-more">' +
        '<button class="action action-more" type="button" id="actions-dropdown-link-<%= dashboard_index %>"' +
        'aria-haspopup="true" aria-expanded="false" aria-controls="actions-dropdown-<%= dashboard_index %>"' +
        'data-dashboard-index="<%= dashboard_index %>">' +
        '<span class="fa fa-cog" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="actions-dropdown" id="actions-dropdown-<%= dashboard_index %>" tabindex="-1">' +
        '<ul class="actions-dropdown-list" id="actions-dropdown-list-<%= dashboard_index %>"' +
        'aria-label="<%- gettext("Available Actions") %>" role="menu">' +
        '<li class="actions-item" role="menuitem">' +
        '<a href="#" class="action resume-attempt"' +
        'data-attempt-id="<%= proctored_exam_attempt.id %>" data-user-id="<%= proctored_exam_attempt.user.id %>" >' +
        '<%- gettext("Resume") %>' +
        '</a>' +
        '</li>' +
        '<li class="actions-item" id="actions-item-email-settings-<%= dashboard_index %>" role="menuitem">' +
        '<a href="#" class="action remove-attempt" data-attempt-id="<%= proctored_exam_attempt.id %>" >' +
        '<%- gettext("Reset") %>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<% } else { %>' +
        '<a href="#" class="action remove-attempt" data-attempt-id="<%= proctored_exam_attempt.id %>" >' +
        '<%- gettext("Reset") %>' +
        '</a>' +
        '<% } %>' +
        '<% } else { %>' +
        '<a href="#" class="remove-attempt" data-attempt-id="<%= proctored_exam_attempt.id %>" >[x]</a>' +
        '<% } %>' +
        ' <% } else { %>N/A <% } %>' +
        '</tr>' +
        ' <% }); %> ' +
        '</tbody>' +
        ' <% } %>' +
        ' </table>' +
        '<% if (!is_proctored_attempts) { %> ' +
        '<p> No exam results found. </p>' +
        '<% } %> ' +
        '</section> </div>';
        this.server = sinon.fakeServer.create();
        this.server.autoRespond = true;
        setFixtures('<div class="student-proctored-exam-container" data-course-id="test_course_id"></div>');

        // load the underscore template response before calling the proctored exam attemp view.
        this.server.respondWith('GET', '/static/proctoring/templates/student-proctored-exam-attempts.underscore',
            [
                200,
                {'Content-Type': 'text/html'},
                html
            ]
        );
    });

    afterEach(function() {
        this.server.restore();
    });
    it('should render the proctored exam attempt view properly', function() {
        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('started'))
            ]
        );
        this.proctored_exam_attempt_view = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptView();

        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items')).toContainHtml('<td> testuser1  </td>');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');
    });

    it('should delete the proctored exam attempt', function() {
        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('started'))
            ]
        );
        this.proctored_exam_attempt_view = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptView();

        // Process all requests so far
        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items')).toContainHtml('<td> testuser1  </td>');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');

        // delete the proctored exam attempt
        this.server.respondWith('DELETE', '/api/edx_proctoring/v1/proctored_exam/attempt/43',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify([])
            ]
        );


        // again fetch the results after the proctored exam attempt deletion
        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(deletedProctoredExamAttemptJson)
            ]
        );

        spyOn(window, 'confirm').and.callFake(function() {
            return true;
        });

        // trigger the remove attempt event.
        spyOnEvent('.remove-attempt', 'click');
        $('.remove-attempt').trigger('click');

        // process the deleted attempt requests.
        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).not.toContain('testuser1');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).not.toContain('Normal Exam');
    });

    it('should search for the proctored exam attempt', function() {
        var searchText = 'testuser1';
        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('started'))
            ]
        );

        this.proctored_exam_attempt_view = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptView();

        // Process all requests so far
        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items')).toContainHtml('<td> testuser1  </td>');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');

        $('#search_attempt_id').val(searchText);

        // search for the proctored exam attempt
        this.server.respondWith(
            'GET',
            '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id/search/' + searchText,
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('started'))
            ]
        );

        // trigger the search attempt event.
        spyOnEvent('.search-attempts > span.search', 'click');
        $('.search-attempts > span.search').trigger('click');

        // process the search attempt requests.
        this.server.respond();

        // search matches the existing attempts
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('testuser1');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');
    });
    it('should clear the search for the proctored exam attempt', function() {
        var searchText = 'invalid_search_text';
        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('started'))
            ]
        );
        this.proctored_exam_attempt_view = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptView();

        // Process all requests so far
        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items')).toContainHtml('<td> testuser1  </td>');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');

        $('#search_attempt_id').val(searchText);

        // search the proctored exam attempt
        this.server.respondWith(
            'GET',
            '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id/search/' + searchText,
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(deletedProctoredExamAttemptJson)
            ]
        );

        // trigger the search attempt event.
        spyOnEvent('.search-attempts > span.search', 'click');
        $('.search-attempts > span.search').trigger('click');

        // process the search attempt request.
        this.server.respond();

        // search doesn't matches the existing attempts
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).not.toContain('testuser1');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).not.toContain('Normal Exam');


        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('started'))
            ]
        );

        // trigger the clear search event.
        spyOnEvent('.search-attempts > span.clear-search', 'click');
        $('.search-attempts > span.clear-search').trigger('click');

        // process the reset attempt request.
        this.server.respond();

        // after resetting the attempts, selector matches the existing attempts
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('testuser1');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');
    });
    it('should mark exam attempt "ready_to_resume" on resume', function() {
        // enable the dropdown via the enable-exam-resume-proctoring-improvements data attribute
        setFixtures('<div class="student-proctored-exam-container" data-course-id="test_course_id" ' +
            'data-enable-exam-resume-proctoring-improvements="True"></div>');

        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('error'))
            ]
        );
        this.proctored_exam_attempt_view = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptView();

        // Process all requests so far
        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items')).toContainHtml('<td> testuser1  </td>');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('error');

        expect(this.proctored_exam_attempt_view.$el.find('button.action').html()).not.toHaveLength(0);
        expect(this.proctored_exam_attempt_view.$el.find('.actions-dropdown').hasClass('is-visible')).toEqual(false);

        this.server.respondWith('PUT', '/api/edx_proctoring/v1/proctored_exam/attempt/43',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify([])
            ]
        );

        // again fetch the results after the proctored exam attempt is marked ready_to_resume
        this.server.respondWith('GET', '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/test_course_id',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(getExpectedProctoredExamAttemptWithAttemptStatusJson('ready_to_resume'))
            ]
        );

        spyOn(window, 'confirm').and.callFake(function() {
            return true;
        });

        // click the gear button to open the action dropdown
        spyOnEvent('.action-more', 'click');
        $('.action-more').trigger('click');

        expect(this.proctored_exam_attempt_view.$el.find('.actions-dropdown').hasClass('is-visible')).toEqual(true);
        expect(this.proctored_exam_attempt_view.$el.find(
            '.actions-dropdown .actions-dropdown-list .actions-item .action'
        )[0].text).toContain('Resume');
        expect(this.proctored_exam_attempt_view.$el.find('.actions-dropdown .actions-dropdown-list '
        + '.actions-item .action')[1].text).toContain('Reset');

        // trigger the resume attempt event.
        spyOnEvent('.resume-attempt', 'click');
        $('.resume-attempt').trigger('click');

        expect(window.confirm.calls.argsFor(0)[0]).toEqual(
            'Are you sure you want to resume this student\'s exam attempt?'
        );

        // process the resume attempt requests.
        this.server.respond();
        this.server.respond();

        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('testuser1');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('Normal Exam');
        expect(this.proctored_exam_attempt_view.$el.find('tr.allowance-items').html()).toContain('ready_to_resume');
        expect(this.proctored_exam_attempt_view.$el.find('.actions-dropdown').hasClass('is-visible')).toEqual(false);
    });
});
