import * as applicantsData from "./applicants.json";
import * as eventsData from "./events.json";
import * as usersData from "./users.json";

const applicants = JSON.stringify(Object.assign([], applicantsData));
const events = JSON.stringify(Object.assign([], eventsData));
const users = JSON.stringify(Object.assign([], usersData));

export const fakeRequest = (data) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => resolve(data), 3000);
  });
};

export const fakeRequestEvents = fakeRequest(events);
export const fakeRequestUsers = fakeRequest(users);
export const fakeRequestApplicants = fakeRequest(applicants);
export const fakeRequestInterviews = fakeRequest(applicants);
export const fakeRequestSignIn = fakeRequest(users[0]);
export const fakeRequestSignOut = fakeRequest(true);
