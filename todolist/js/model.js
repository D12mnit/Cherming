$(document).ready(function() {
    var taskcount = 0,
        addCateBtn = $('.new-tasklist'),
        addTaskBtn = $('.new-task'),
        deleteCateBtn = $('.delete'),
        cateList = $('.category'),
        taskBar = $('.main-list'),
        taskListTab = $('.task-list .title li');



    var taskStorage = []; //本地储存数组
    var categoryStorage = [];

    function Category() {};
    var category = new Category();
    Category.prototype.count = function() {
        return categoryStorage.length ? categoryStorage[categoryStorage.length - 1].id : 0;
    }
    Category.prototype.newCategory = function(name, parentId) {
        var newCate = {
            name: name,
            id: this.getId(),
            num: 0,
            parentId: parentId //0表示最高级，其他数表示第二级
        }

        categoryStorage.push(newCate);
        addCategory(newCate);
    };
    Category.prototype.getId = function() {
        var id = this.count();
        return ++id;
    };
    Category.prototype.removeCate = function(cateId) {
        for (var i = 0; i < categoryStorage.length; i++) {
            if (categoryStorage[i].id == cateId) {
                categoryStorage.splice(i, 1);
                this.save();
                break;
            }
        }
        deleteCateNode(cateId);
    };
    Category.prototype.save = function() {
        localStorage.setItem('CategoryList', JSON.stringify(categoryStorage));
    };
    Category.prototype.getCateList = function() {
        var catelist = localStorage.getItem('CategoryList');
        categoryStorage = JSON.parse(catelist);
    };

    function addTaskNum(cateId) {
        for (var i = 0; i < categoryStorage.length; i++) {
            if (categoryStorage[i].id == cateId) {
                categoryStorage[i].num++;
                category.save();
                return;
            }
        }
    };

    function cutTaskNum(cateId) {
        for (var i = 0; i < categoryStorage.length; i++) {
            if (categoryStorage[i].id == cateId) {
                categoryStorage[i].num--;
                category.save();
                return;
            }
        }
    };

    function getTaskNum(cateId) {
        for (var i = 0; i < categoryStorage.length; i++) {
            if (categoryStorage[i].id == cateId) {
                return categoryStorage[i].num;
            }
        }
    };

    function addCategory(name) {
        if (!name.parentId) {
            var newCateList = "<li class=\"level level-1\"><a class=\"category-name\" data-cateId=\"" + name.id + "\">" + name.name + "(<span class=\"count\">" + name.num + "</span>)<span class=\"delete\">X</span></a></li>";
            $('.category').append(newCateList);
        } else {
            var newCateList = "<li class=\"level level-2\"><a class=\"category-name\" data-cateId=\"" + name.id + "\">" + name.name + "(<span class=\"count\">" + name.num + "</span>)<span class=\"delete\">X</span></a></li>";
            $(".category-name[data-cateId='" + name.parentId + "']").parent().append(newCateList);
            $(".category-name[data-cateId='" + name.parentId + "']").parent().addClass('hasSubCate');
        }
    }

    function deleteCateNode(cateId) {
        $(".category-name[data-cateid='" + cateId + "']").parent().remove();
    }

    function cateNumberRefresh() {
        var alltasknum = $('#task-count');
        alltasknum.html(taskStorage.length);
        $('.category-name').each(function() {
            var num = getTaskNum($(this).attr('data-cateid'));
            $(this).children('.count').html(num);
        });
    }

    /*=============================
    分类操作，分类对象创建及添加，删除等
    =============================*/
    function Task() {};
    var task = new Task();
    Task.prototype.count = function() {
        return taskStorage.length ? taskStorage[taskStorage.length - 1].id : 0;
    }
    Task.prototype.newTask = function(title, date, value, category) {
        var newtask = {
            name: title,
            id: this.getId(),
            date: date,
            value: value,
            categoryId: category,
            finished: 0
        }

        taskStorage.push(newtask);
        addTaskNum(category);
        taskviewBuild(newtask);
    };

    Task.prototype.getId = function() {
        var id = this.count();
        return ++id;
    }
    Task.prototype.removeTask = function(taskId) {
        for (var i = 0; i < taskStorage.length; i++) {
            if (taskStorage[i].id == taskId) {
                cutTaskNum(taskStorage[i].categoryId);
                taskStorage.splice(i, 1);
                this.save();
                break;
            }
        }
        deleteTaskNode(taskId);
    };
    Task.prototype.taskRefresh = function(taskId, title, date, value) {
        for (var i = 0; i < taskStorage.length; i++) {
            if (taskStorage[i].id == taskId) {
                taskStorage[i].name = title;
                taskStorage[i].date = date;
                taskStorage[i].value = value;
                break;
            }
        }
    };
    Task.prototype.save = function() {
        localStorage.setItem('TaskStorage', JSON.stringify(taskStorage));
    };
    Task.prototype.getTaskList = function() {
        var taskList = localStorage.getItem('TaskStorage');
        taskStorage = JSON.parse(taskList);
    };
    Task.prototype.finishTask = function(id) {
        for (var i = 0; i < taskStorage.length; i++) {
            if (taskStorage[i].id == id) {
                taskStorage[i].finished = 1;
                this.save();
                break;
            }
        }
        taskListRefresh();
    };

    function taskviewBuild(taskname) {
        if (!$('.category-name').hasClass('selected')) {
            addTaskView(taskname);
        } else if (taskname.categoryId == $('.category-name.selected').attr('data-cateid')) {
            addTaskView(taskname);
        } else {
            return;
        }
    }

    function addTaskView(taskname) {
        var date = taskname.date,
            finished = taskname.finished ? 'finished' : '',
            title = taskname.name,
            id = taskname.id;
        if ($(".date-list[data-taskdate='" + date + "']").length == 0) {
            var newtaskContent = "<div class=\"date-list\" data-taskdate=\"" + date + "\"><span class=\"task-date\">" + date + "</span><ul><li class=\"task-name " + finished + "\" data-taskid=\"" + id + "\">" + title + "<span class=\"delete\">X</span></li></ul></div>";
            $('.main-list').append(newtaskContent);
        } else {
            var newtaskContent = "<li class=\"task-name " + finished + "\" data-taskid=\"" + id + "\">" + title + "<span class=\"delete\">X</span></li>";
            $(".date-list[data-taskdate='" + date + "'] ul").append(newtaskContent);
        }
    }

    function taskListRefresh() {
        var length = taskStorage.length,
            selectedCate = $('.category-name.selected').attr('data-cateid'),
            selectedIndex = $('.task-list .head .title .selected').index();
        $('.date-list').remove();
        if (!$('.category-name').hasClass('selected')) {
            if (selectedIndex == 0) {
                for (var i = 0; i < length; i++) {
                    addTaskView(taskStorage[i]);
                }
            } else if (selectedIndex == 1) {
                for (var i = 0; i < length; i++) {
                    taskStorage[i].finished == 0 ? addTaskView(taskStorage[i]) : 0;
                    continue;
                }
            } else {
                for (var i = 0; i < length; i++) {
                    taskStorage[i].finished == 1 ? addTaskView(taskStorage[i]) : 0;
                    continue;
                }
            }
        } else {
            for (var i = 0; i < length; i++) {
                if (taskStorage[i].categoryId == selectedCate && selectedIndex == 0) {
                    addTaskView(taskStorage[i]);
                } else if (taskStorage[i].categoryId == selectedCate && selectedIndex == 1) {
                    taskStorage[i].finished == 0 ? addTaskView(taskStorage[i]) : 0;
                    continue;
                } else if (taskStorage[i].categoryId == selectedCate && selectedIndex == 2) {
                    taskStorage[i].finished == 1 ? addTaskView(taskStorage[i]) : 0;
                    continue;
                } else {
                    continue;
                }
            }
        }
    }

    function deleteTaskNode(taskId) {
        var node = $(".task-name[data-taskid='" + taskId + "']");
        if (node.parent().children().length == 1) {
            node.parent().parent().remove();
        } else {
            node.remove();
        }
    }

    function showTask(taskId) {
        var title = '',
            date = '',
            content = '',
            complete = '';
        for (var i = 0; i < taskStorage.length; i++) {
            if (taskStorage[i].id == taskId) {
                title = taskStorage[i].name;
                date = taskStorage[i].date;
                content = taskStorage[i].value;
                complete = taskStorage[i].finished ? '' : '<span class=\"task-btn finish-btn\" id=\"complete-btn\">完成</span>';
                break;
            }
        }
        var taskcontent = "<div class=\"task-content\"><header class=\"task-title\"><p class=\"title\"><span class=\"title-value\" id=\"title-value\">" + title + "</span>" + complete + "<span class=\"task-btn edit-btn\">编辑</span></p></header><section class=\"task-date\"><p class=\"date\">任务日期: <span class=\"load-date\">" + date + "</span></p></section><article class=\"text-content\">" + content + "</article></div>";
        $('.task-detail').html(taskcontent);
    }

    function showTaskEdit(newtask) {
        var task = newtask ? 'newtask' : '';
        var content = "<div class=\"task-edit " + task + "\"><header class=\"task-title\"><input type=\"text\" class=\"header-edit\" id=\"title-value\" placeholder=\"请输入标题\"><span class=\"task-btn finish-btn\" id=\"cancel-btn\">取消</span><span class=\"task-btn finish-btn\" id=\"submit-btn\">提交</span></header><section class=\"task-date\"><input type=\"text\" class=\"header-edit\" id=\"date-value\" placeholder=\"请输入日期:格式2015-11-28\"></section><article class=\"text-content\"><textarea name=\"content\" id=\"content-edit\"></textarea></article></div>";
        $('.task-detail').html(content);
    }
    // initial和相关操作
    // 分类列表initial
    function CateInit() {
        // 添加分类按钮事件监听
        addCateBtn.on('click', function(event) {
            var name = prompt('请输入新分类名称', '');
            if (name) {
                var num = $('.category .category-name').hasClass('selected') ? $('.category .category-name.selected').attr('data-cateId') : 0;
                category.newCategory(name, num);
                category.save();
            } else {
                return;
            }
        });
        //删除分类监听
        cateList.on('click', '.delete', function(event) {
            event.preventDefault();
            var id = $(this).parent().attr('data-cateid');

            if (confirm('确定要删除该分类么？') && id != 1) {
                category.removeCate(id);
                cateNumberRefresh();
            } else {
                return;
            }
        });


        if (localStorage.getItem('CategoryList')) {
            category.getCateList();
            for (var i = 0; i < categoryStorage.length; i++) {
                addCategory(categoryStorage[i]);
            }
        } else {
            category.newCategory('默认分类', 0);
            category.newCategory('家庭生活', 0);
            category.newCategory('社团活动', 0);
            category.newCategory('项目任务', 0);
            category.save();
        }
    }

    CateInit();

    //任务init
    function taskInit() {
        $('.date-list').remove();
        if (localStorage.getItem('TaskStorage')) {
            task.getTaskList();
            for (var i = 0; i < taskStorage.length; i++) {
                taskviewBuild(taskStorage[i]);
            }
            $('.task-name').eq(0).addClass('selected');
            showTask(taskStorage[0].id);
            cateNumberRefresh();
        } else {
            task.newTask('to-do-1', '2015-12-04', 'to do 1示例', 1);
            task.newTask('to-do-2', '2015-12-04', 'to do 2示例', 1);
            task.newTask('to-do-3', '2015-12-05', 'to do 3示例', 1);
            task.newTask('to-do-4', '2015-12-05', 'to do 4示例', 2);
            task.newTask('to-do-5', '2015-12-02', 'to do 5示例', 2);
            task.save();
            showTask(taskStorage[0].id);
            $('.task-name').eq(0).addClass('selected');
            cateNumberRefresh();
        }
    }
    taskInit();

    //切换分类
    function switchCategory() {
        var topCate = $('.categorylist .title');
        topCate.click(function(event) {
            $('.category-name').removeClass('selected');
            $(this).addClass('selected');
            taskListRefresh();
        });
        cateList.on('click', 'a', function(event) {
            if ($(this).hasClass('selected')) {
                $(this).parent().toggleClass('active');
            } else if (!$(this).hasClass('selected')) {
                $('.category-name').removeClass('selected');
                topCate.removeClass('selected');
                $(this).addClass('selected');
                $(this).parent().addClass('active');
                taskListRefresh();
            }
        });
    }
    //切换任务栏已完成or未完成or所有
    taskListTab.click(function(event) {
        taskListTab.removeClass('selected');
        $(this).addClass('selected');
        taskListRefresh();
    });
    taskBar.on('click', '.delete', function(event) {
        event.preventDefault();
        var taskid = $(this).parent().attr('data-taskid');
        if (confirm('确定要删除该任务么？删除后将无法恢复')) {
            task.removeTask(taskid);
        } else {
            return;
        }
        cateNumberRefresh();
        showTask(taskStorage[0].id);
        return false;
    });
    taskBar.on('click', '.task-name', function(event) {
        event.preventDefault();
        if ($('.task-edit').length == 0 || confirm('离开当前页面会丢失现有的输入数据，是否确定？')) {
            var taskid = $(this).attr('data-taskid');
            $('.task-name').removeClass('selected');
            $(this).addClass('selected');
            showTask(taskid);
        }
    });
    switchCategory();


    //添加任务相关事件监听
    addTaskBtn.click(function(event) {
        showTaskEdit(1);
        $('#title-value').focus();
    });

    var taskEditbar = $('.task-detail');

    function taskEdit() {
        taskEditbar.on('click', '#submit-btn', function() {
            var title = $('#title-value').val(),
                date = $('#date-value').val(),
                content = $('#content-edit').val(),
                category = $('.category-name').hasClass('selected') ? $('.category-name.selected').attr('data-cateid') : 1;
            if (!title || !date || !content) {
                alert('请填写内容，不允许为空');
                return;
            } else if (!/^\d{4}\-\d{2}\-\d{2}$/.test(date)) {
                alert('请输入正确格式的日期');
                $('#date-value').focus().select();
                return;
            }

            title = $('<div/>').text(title).html();
            date = $('<div/>').text(date).html();
            content = $('<div/>').text(content).html();
            if ($('.task-edit').hasClass('newtask')) {
                task.newTask(title, date, content, category);
            } else {
                var currentId = $('.task-name.selected').attr('data-taskid');
                task.taskRefresh(currentId, title, date, content);
            }
            task.save();
            cateNumberRefresh();
            taskListRefresh;
            showTask(taskStorage[taskStorage.length - 1].id);
        });
        //完成事件监听
        taskEditbar.on('click', '#complete-btn', function(event) {
            event.preventDefault();
            var id = $('.task-name.selected').attr('data-taskid');
            task.finishTask(id);
        });
        //进入任务编辑页面事件监听
        taskEditbar.on('click', '.task-btn.edit-btn', function(event) {
            event.preventDefault();
            var title = $('#title-value').html(),
                date = $('.load-date').html(),
                value = $('.text-content').html();

            showTaskEdit();
            $('#title-value').val(title);
            $('#date-value').val(date);
            $('#content-edit').val(value);
            $('#title-value').focus();
        });
    }
    taskEdit();
});