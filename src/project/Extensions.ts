enum Extension {
  Wedo2 = "wedo2",
  Boost = "boost",
  Ev3 = "ev3",
  GdxFor = "gdxfor",
  MakeyMakey = "makeymakey",
  Microbit = "microbit",
  Translate = "translate",
  Text2Speech = "text2speech",
  FaceSensing = "facesensing",
  VideoSensing = "videosensing",
  Pen = "pen",
  Music = "music",
}

export const EXTENSION_PREFIXES: ReadonlyArray<[string, Extension]> = [
  ['pen_',         Extension.Pen],
  ['music_',       Extension.Music],
  ['ev3_',         Extension.Ev3],
  ['gdxfor_',      Extension.GdxFor],
  ['makeymakey_',  Extension.MakeyMakey],
  ['microbit_',    Extension.Microbit],
  ['translate_',   Extension.Translate],
  ['text2speech_', Extension.Text2Speech],
  ['faceSensing_', Extension.FaceSensing],
  ['videoSensing_',Extension.VideoSensing],
  ['wedo2_',       Extension.Wedo2],
  ['boost_',       Extension.Boost],
];

export default Extension;