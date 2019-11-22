module.exports = {
    addStudentPage : (req, res)=> {
        res.render('add-student.ejs');
    },
    addStudent: (req, res)=>{
        let {name, phone} = req.body;
        console.log(name, phone);
        let userName = "select * from users where name='"+name+"'";
        db.query(userName, (err, result)=>{
            console.log(result.length)
            if(err){
                return res.status(500).send(err);
            }
            if(result.length){
                message = 'User already exists';
                res.render('add-student.ejs', {
                    message
                });
            }else {
                let query = `insert into users values('${name}', '${phone}')`;
                db.query(query, (err, result)=>{
                    if(err){
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                })
            }
            
        });
    },
    addTeacherPage: (req, res)=>{
        const query = "select * from class";
        const classes = [];
        db.query(query, (err, result)=>{
            console.log(result);
            if(!err){
                classes = result;
            }else {
                res.status(500).send(err);
            }

        });
        res.render('add-teacher.ejs', {classes});
        
    },
    addTeacher: (req, res)=>{
        res.json('student page');
        
    },
    addClassPage:  (req, res)=>{
        res.render('add-class.ejs', {message: ''});
        
    },
    addClass: (req, res)=>{
        const name = req.body.name;
        console.log(req.body);
        let className = "select * from class where name='" + name + "'";
        console.log(className);
        db.query(className, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length) {
                message = 'Class already exists';
                res.render('add-class.ejs', {
                    message
                });
            } else {
                let query = `insert into class(name) values('${name}')`;
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                })
            }

        });
    },
    addNewsPage: (req, res)=>{
        res.render('add-news.ejs');
    },
    addNews: (req, res)=>{
        res.json("bla");
    }
}