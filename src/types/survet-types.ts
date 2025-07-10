export interface ISurveyInfo {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  gratitudeTitle: string;
  gratitudeDescription: string;
  maxPoint: number;
  svgIcon: string;
  fillSvgIcon: string;
  pointGroupTitle: string;
  points: [
    {
      title: string;
      pointValue: number;
    }
  ];
  details: ISurveyQuestions[];
  additionalOpinion: string;
  applyDate: string;
  averagePoints: number;
}

export interface ISurveyQuestions {
  id: number;
  title: string;
  imageUrl: string;
  givenPoint: number;
  applyDate: string;
}

export interface IApplySurveyPoint {
  invoiceId: string;
  surveyId: number;
  surveyDetailId: number;
  givenPoint: number;
}

export interface IConfirmSurveyPoints {
  invoiceId: string;
  surveyId: number;
  additionalOpinion: string;
}
