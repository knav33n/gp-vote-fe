import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:8000/api/v1/auth/register", () => {
    return HttpResponse.json();
  }),
  http.post("http://localhost:8000/api/auth/login", () => {
    return HttpResponse.json({ token: 'mock-token' });
  }),
  http.get("http://localhost:8000/api/v1/title", () => {
    return HttpResponse.json([
      { uuid: "1", title: "Title One" },
      { uuid: "2", title: "Title Two" },
    ]);
  }),
];
