import "reflect-metadata"
import { sqlconfig } from "./data-source.js"
import express from "express"
import mssql from "mssql"
import cors from "cors"
import multer from "multer"
import axios from "axios"
const port = 5000

const App = express()
App.use(cors())
App.use(express.json())
mssql.connect(sqlconfig)

var filestorage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './upload')
    },
    filename: (req, file, res) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        res(null, file.originalname)
    }
})


var upload = multer({ storage: filestorage })

App.post('/uploadfile', upload.single('tenfile'), async (req, res) => {
    try {
        return res.status(200).json({
            originalName: req.file.originalname
        })
    } catch (error) {
        console.log(error);
    }
})

App.put('/updatefile', upload.single('tenfile'), async (req, res) => {
    try {
        await mssql.query`update SeekerProfile set Image = ${req.body.file} where ID = ${req.body.ID}`
        return res.status(200).json({
            originalName: req.file.originalname
        })
    } catch (error) {
        console.log(error);
    }
})

App.listen(port, () => {
    console.log(`http://localhost:${port}`);
})



// Acount Seeker
App.get('/getdataAccount', async (req, res) => {
    try {
        var result = await mssql.query`select * from SeekerAccount`
        var { recordset } = result
        return res.status(200).json(recordset)
    } catch (error) {
        console.log(error);
    }
})


App.post('/postdataAccount', async (req, res) => {
    try {
        await mssql.query`insert into SeekerAccount values(${req.body.FullName}, ${req.body.UserName}, ${req.body.Password})`
        return res.status(200).json("post successful")
    } catch (error) {
        console.log(error);
    }
})

App.delete('/deletedataAccount', async (req, res) => {
    try {
        await mssql.query`delete from SeekerAccount where ID < 5`
        return res.status(200).json("delete successful")
    } catch (error) {
        console.log(error);
    }
})


// Profile Seeker
App.get('/getdataProfile', async (req, res) => {
    try {
        var result = await mssql.query`select * from SeekerProfile`
        var { recordset } = result
        return res.status(200).json(recordset)
    } catch (error) {
        console.log(error);
    }
})


App.post('/postdataProfile', async (req, res) => {
    try {
        const profile = await mssql.query`insert into SeekerProfile values(${req.body.IDSEEKER}, ${req.body.Title}, ${req.body.Name}, ${req.body.Nationality}, 
            ${req.body.DayOfBitrh}, ${req.body.Married}, ${req.body.Sex}, '',
            ${req.body.Phone}, ${req.body.Email}, ${req.body.Country}, ${req.body.Address},
            ${req.body.Education}, ${req.body.School}, ${req.body.Specialize}, ${req.body.Exp},
            ${req.body.Majors}, ${req.body.Status})`
        
        return res.status(200).json(profile)
    } catch (error) {
        console.log(error);
    }
})

App.delete('/deletedataProfile', async (req, res) => {
    try {
        console.log(req.body)
        await mssql.query`delete from SeekerProfile where ID < 20`
        return res.status(200).json("delete successful")
    } catch (error) {
        console.log(error);
    }
})

App.put('/putdataProfile', async (req, res) => {
    try {
        console.log(req.body.file);
        console.log(req.body.profileName);
        await mssql.query`update SeekerProfile set Image = ${req.body.file} where ID = ${req.body.profileName}`
        return res.status(200).json("update successful")
    } catch (error) {
        console.log(error);
    }
})


//Info Company
App.get('/getdataInfo', async (req, res) => {
    try {
        var result = await mssql.query`select * from InfoCompany`
        var { recordset } = result
        return res.status(200).json(recordset)
    } catch (error) {
        console.log(error);
    }
})


App.post('/postdataInfo', async (req, res) => {
    try {
        await mssql.query`insert into InfoCompany values(${req.body.UserName}, ${req.body.Password}, ${req.body.NameCompany}, ${req.body.NameOwner}, ${req.body.Phone}, ${req.body.Address})`
        return res.status(200).json("post successful")
    } catch (error) {
        console.log(error);
    }
})

App.delete('/deletedataInfo', async (req, res) => {
    try {
        await mssql.query`delete from InfoCompany where ID = 12`
        return res.status(200).json("delete1 successful")
    } catch (error) {
        console.log(error);
    }
})



//Post Conpany
App.get('/getdataPost', async (req, res) => {
    try {
        var result = await mssql.query`select * from PostBusiness`
        var { recordset } = result
        return res.status(200).json(recordset)
    } catch (error) {
        console.log(error);
    }
})

App.post('/postdataPost', async (req, res) => {
    try {
        await mssql.query`insert into PostBusiness values(${req.body.id}, ${req.body.chucdanh}, ${req.body.tencongty}, ${req.body.webcongty}, ${req.body.lengthemployee}, ${req.body.CategoryOfWork}, ${req.body.workingPosition}, 
            ${req.body.Salary}, ${req.body.old}, ${req.body.gender}, ${req.body.AcademicLevel}, ${req.body.ExperienceLevel}, ${req.body.PreferredLanguage},
            ${req.body.Address}, ${req.body.Country}, ${req.body.ContactPhone}, ${req.body.ContactEmail})`
        return res.status(200).json("post successful")
    } catch (error) {
        console.log(error);
    }
})

App.delete('/deletedataPost', async (req, res) => {
    try {
        await mssql.query`delete from PostBusiness where ID = 10`
        return res.status(200).json("delete1 successful")
    } catch (error) {
        console.log(error);
    }
})




// Apply
App.get('/getdataApply', async (req, res) => {
    try {
        var result = await mssql.query`select * from SeekerApply`
        var { recordset } = result
        return res.status(200).json(recordset)
    } catch (error) {
        console.log(error);
    }
})

App.post('/postdataApply', async (req, res) => {
    try {
        await mssql.query`insert into SeekerApply values(${req.body.IDCOMPANY}, ${req.body.IDPROFILE}, ${req.body.IDPOST})`
        return res.status(200).json("post successful")
    } catch (error) {
        console.log(error);
    }
})

App.delete('/deletedataApply/:id/:id1', async (req, res) => {
    try {
        var id = req.params.id
        var id1 = req.params.id1
        await mssql.query`delete from SeekerApply where IDPOST = ${id} and IDPROFILE = ${id1}`
        return res.status(200).json("delete successful")
    } catch (error) {
        console.log(error);
    }
})



// Option
App.get('/getdataOption', async (req, res) => {
    try {
        var result = await mssql.query`select * from OptionCompany`
        var { recordset } = result
        return res.status(200).json(recordset)
    } catch (error) {
        console.log(error);
    }
})

App.post('/postdataOption', async (req, res) => {
    try {
        await mssql.query`insert into OptionCompany values(${req.body.IDPOST}, ${req.body.IDSEEKER}, ${req.body.IDCOMPANY}, ${req.body.IDPROFILE}, ${req.body.STATUS})`
        return res.status(200).json("post successful")
    } catch (error) {
        console.log(error);
    }
})






