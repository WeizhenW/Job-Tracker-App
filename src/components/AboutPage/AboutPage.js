import React from 'react';
import './AboutPage.css';
import '../Techniques/Techniques';
import Techniques from '../Techniques/Techniques';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
  <div className="aboutInfo">
      <p>Job Cracker is an app there will facilitate the job application process for the job seekers, by centralizing the job hunting related information in a single location.</p> 
      <p>User will be able to:</p>
      <ul>
        <li>Add a new job to the job list, delete an existing job from the list, and update job status along with the application process</li>
        <li>Browse and update job details</li>
        <li>Upload the job related files into AWS S3 and retrieve them when needed</li>
        <li>Fetch new job posts from Indeed.com and add a job from indeed to the job list by a single click</li>
        <li>Get reminders for follow up actions after application or interview</li>
        <li>Search for jobs by company name or by status in the job list</li>
        <li>Add connections into the directory, and add a contact as referee to a job</li>
        <li>Track job application progress from the dashboard</li>
      </ul>
  </div>
  <Techniques />
  </div>
);

export default AboutPage;
