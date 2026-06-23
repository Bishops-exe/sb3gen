/**
 * Lists: seed a list of colors, then say a random one.
 *
 * Shows:
 *  - stage.addList() returns a ListInputVal usable directly in list blocks
 *  - s.embed(list) creates a draggable data_listcontents block
 *  - Deeply nested embed(): Say → ItemOfList → Random → LengthOfList
 */
import {
  Project, Costume,
  WhenFlagClicked, SayForSecs,
  DeleteAllOfList, AddToList, ShowList, HideList,
  ItemOfList, LengthOfList, Random,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#fce4ec'));

const colors = stage.addList('colors');

const sprite = project.addSprite('Picker');
sprite.costumes.push(Costume.rect('costume1', '#E91E63', 80, 80, 8));

sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(DeleteAllOfList(colors));
  for (const color of ['red', 'orange', 'yellow', 'green', 'blue', 'violet']) {
    s.push(AddToList(color, colors));
  }
  s.push(ShowList(colors));

  s.push(SayForSecs(
    s.embed(ItemOfList(
      s.embed(Random(1, s.embed(LengthOfList(colors)))),
      colors
    )),
    2
  ));

  s.push(HideList(colors));
});

await project.save(`${import.meta.dir}/lists.sb3`);
console.log('Written lists.sb3');
