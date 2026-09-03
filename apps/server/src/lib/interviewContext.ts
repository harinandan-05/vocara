const interviewContextMap = new Map<string, string>();

export function setInterviewContext(interviewId: string, context: string) {
  interviewContextMap.set(interviewId, context);
}

export function getInterviewContext(interviewId: string) {
  return interviewContextMap.get(interviewId) ?? "No GitHub data available.";
}
