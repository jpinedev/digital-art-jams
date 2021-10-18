import Gallery from "../model/gallery/gallery";

export const galleriesMap: {[key:string]: Gallery} = {
  fallJam: {
    id: "fallJam",
    logo: "https://m.media-amazon.com/images/I/91Fbb4jjCHL._AC_SL1500_.jpg",
    title: "Fall Jam",
    description: "Create an autumnal scene or feeling.",
    createDate: new Date(Date.parse("2021-10-17")),
    submissionOpenDate: new Date(Date.parse("2021-10-18T00:00:00")),
    submissionCloseDate: new Date(Date.parse("2021-10-24T11:59:59")),
    submissions: []
  },
  spookyJam: {
    id: "spookyJam",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Jack-o%27-Lantern_2003-10-31.jpg",
    title: "Spooky Jam",
    description: "Its time for SPOOKY season!! Show off characters in halloween costumes or give us some frights.",
    createDate: new Date(Date.parse("2021-10-24")),
    submissionOpenDate: new Date(Date.parse("2021-10-25T00:00:00")),
    submissionCloseDate: new Date(Date.parse("2021-10-31T11:59:59")),
    submissions: []
  },
}

export const galleriesIds: string[] = Object.keys(galleriesMap);

export const galleriesArray: Gallery[] = galleriesIds.map((key: string) => galleriesMap[key]);