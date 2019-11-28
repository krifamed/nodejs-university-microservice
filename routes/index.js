const request = require('request');
const url = "http://a82ec057.ngrok.io";
module.exports = {
    addStudentPage : (req, res)=> {
        const query = "select * from class";
        db.query(query, (err, result) => {
            console.log(result);
            if (!err) {
                res.render('add-student.ejs', { message: '', classes: result });
            } else {
                return res.status(500).send(err);
            }
        });
    },
    addStudent: (req, res)=>{
        let {name, phone, class_id} = req.body;
        console.log(name, phone);
        let userName = "select * from users where name='"+name+"'";
        db.query(userName, (err, result)=>{
            console.log(result.length);
            if(err){
                return res.status(500).send(err);
            }
            if(result.length){
                message = 'User already exists';
                res.render('add-student.ejs', {
                    message
                });
            }else {
                let query = `insert into users(name, phone, class_id) values('${name}', '216${phone}', '${class_id}')`;
                db.query(query, (err, result)=>{
                    if(err){
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                })
            }
            
        });
    },
    addTeacherPage: async (req, res)=>{
        const query = "select * from class";
        await db.query(query, (err, result)=>{
            console.log(result);
            if(!err){
                res.render('add-teacher.ejs', {message: '', classes: result});
            }else {
                return res.status(500).send(err);
            }
        });
        
    },
    addTeacher: (req, res)=>{
        const {name, classes} = req.body;
        let teacherName = "select * from teachers where name='" + name + "'";
        db.query(teacherName, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length) {
                message = 'Teacher already exists';
                res.render('add-teacher.ejs', {
                    message
                });
            } else {
                let query = `insert into teachers(name) values('${name}')`;
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }else{
                        const teacherId = result.insertId;
                        classes.forEach(item => {
                            query = `insert into teachers_classes(teacher_id, class_id) values('${teacherId}', '${item}')`;
                            db.query(query, (err, result) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                            })
                        })

                    }
                    res.redirect('/');
                })
            }

        });
        
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
            if (result.length>0) {
                message = 'Class already exists';
                return res.render('add-class.ejs', {
                    message
                });
            } else {
                let query = `insert into class(name) values('${name}')`;
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    
                    return res.redirect('/');
                })
            }

        });
    },
    addNewsPage: async (req, res) => {
        const query = "select * from teachers";
        await db.query(query, (err, result) => {
            if (!err) {
                res.render('add-news.ejs', { message: '', teachers: result });
            } else {
                return res.status(500).send(err);
            }
        });
    },
    addNews: async (req, res)=>{
        const {message, teacher} = req.body;
        const phones = [];
        const query = "select `class_id` from teachers_classes where teacher_id='" + teacher + "'";
        await db.query(query, async (err, result) => {
            if (!err) {
                await result.forEach(async item=> {
                    let usersQuery = "select phone from users where class_id='" + item.class_id + "'";  
                    await db.query(usersQuery, (err, users)=>{
                        if(!err){
                            phones.push(...users.map(user=> user.phone));
                        }else {
                            console.log(err);
                        }

                    })
                });

            } else {
                return res.status(500).send(err);
            }
        });

        console.log(`${url}/bulksend`, phones);
        await request.post({
            headers: {
                'content-type': 'application/json'
            },
            url: `${url}/bulksend`,
            body: JSON.stringify({
                to:phones,
                text:message
            })
        }, (err, response, body) => {
            if (!err) {
                console.log("phones : ", response, body);
                res.status(202).send("Messages send successfully");
            } else {
                res.status(402).send({ "error": `Send sms service return an error : ${err}` });
            }
        })

    }
}