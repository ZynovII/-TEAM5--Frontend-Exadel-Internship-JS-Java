import * as applicants from "./applicants.json";
import * as events from "./events.json";
import * as users from "./users.json";

export const fakeRequest = (data) => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

export const fakeRequestEvents = fakeRequest(events);
export const fakeRequestUsers = fakeRequest(users);
export const fakeRequestApplicants = fakeRequest(applicants);
