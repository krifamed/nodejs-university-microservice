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
        res.json('student page');
        
    },
    addTeacher: (req, res)=>{
        res.json('student page');
        
    },
    addClassPage:  (req, res)=>{
        res.json('student page');
        
    },
    addClass: (req, res)=>{
        res.json('student page');
        
    },
}