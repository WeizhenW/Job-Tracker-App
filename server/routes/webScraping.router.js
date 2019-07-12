const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//scraping package
const rp = require('request-promise');
const $ = require('cheerio');
//fetch javascript developer
router.get('/javascript', rejectUnauthenticated, (req, res) => {
    rp('https://www.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&as_src=&salary=&radius=25&l=minneapolis&fromage=7&limit=50&sort=&psf=advsrch')
    .then( (html) => {
        let jobsToDisplay = [];
        const jobTitle = $('.title', html);
        const numOfJobs = jobTitle.length;
        const jobCompany = $('.company', html);
        
        for(let i = 0; i < numOfJobs; i ++) {
            jobsToDisplay.push({
                title: jobTitle[i].children[1].attribs.title,
                href: 'http://www.indeed.com' + jobTitle[i].children[1].attribs.href,
                company: jobCompany[i].children[0].data.trim(),
            })
        }
        res.send(jobsToDisplay);
}).catch(
    error => {
        console.log('error with scraping', error);
        res.sendStatus(500);
    }
)})

//fetch software engineer
router.get('/software', rejectUnauthenticated, (req, res) => {
    console.log('in web scraping')
    rp('https://www.indeed.com/jobs?as_and=software+engineer&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&as_src=&salary=&radius=25&l=minneapolis&fromage=7&limit=50&sort=&psf=advsrch')
    .then( (html) => {
        let jobsToDisplay = [];
        const jobTitle = $('.title', html);
        const numOfJobs = jobTitle.length;
        const jobCompany = $('.company', html);
        
        for(let i = 0; i < numOfJobs; i ++) {
            jobsToDisplay.push({
                title: jobTitle[i].children[1].attribs.title,
                href: 'http://www.indeed.com' + jobTitle[i].children[1].attribs.href,
                company: jobCompany[i].children[0].data.trim(),
            })
        }
        res.send(jobsToDisplay);
}).catch(
    error => {
        console.log('error with scraping', error);
        res.sendStatus(500);
    }
)})

//fetch front end  developer
router.get('/frontend', rejectUnauthenticated, (req, res) => {
    console.log('in web scraping')
    rp('https://www.indeed.com/jobs?as_and=Front+End+Developer&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&as_src=&salary=&radius=25&l=Minneapolis%2C+MN&fromage=7&limit=50&sort=&psf=advsrch')
    .then( (html) => {
        let jobsToDisplay = [];
        const jobTitle = $('.title', html);
        const numOfJobs = jobTitle.length;
        const jobCompany = $('.company', html);
        
        for(let i = 0; i < numOfJobs; i ++) {
            jobsToDisplay.push({
                title: jobTitle[i].children[1].attribs.title,
                href: 'http://www.indeed.com' + jobTitle[i].children[1].attribs.href,
                company: jobCompany[i].children[0].data.trim(),
            })
        }
        res.send(jobsToDisplay);
}).catch(
    error => {
        console.log('error with scraping', error);
        res.sendStatus(500);
    }
)})

module.exports = router;