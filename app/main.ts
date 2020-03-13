/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */

import { Fragment } from "./base/fragment";
import { Color } from "./value/color";
import { LinearLayout } from "./component/linear_layout";
import { ViewGroup } from "./base/view_group";
import { Orientation } from "./value/style";
import { App, ChildFragmentModel } from "./app";
import { TextType, TextView } from "./component/text_view";
import { ImageMode, ImageView } from "./component/image_view";
import { RelativeLayout } from "./component/relative_layout";
import { Rectangle } from "./component/rectangle";
import { GridLayout } from "./component/grid_layout";
import { IconButton } from "./component/button/icon_button";
import { Input, InputType } from "./component/input/input";

export class Main extends App {
  constructor() {
    super();
  }

  protected async onCreate(): Promise<void> {
    const fragment = new Text();
    await this.addFragment(new ChildFragmentModel(fragment, true));
  }
}

class Text extends Fragment {
  private layout = new LinearLayout(Orientation.Horizontal);

  protected async onCreateView(context: ViewGroup): Promise<void> {
    this.layout
      .setWidth(900)
      .setHeight(800)
      .setBorder("2px solid yellow")
      .setBackgroundColor(Color.black);
    let rect;
    let textView;
    let image;
    for (let index = 0; index < 2; index++) {
      rect = new ViewGroup()
        .setWidth(100)
        .setHeight(50 * index)
        .setBackgroundColor(Color.white)
        .setMargin("10px");
      textView = new TextView()
        .setText(`Hello ${index}`)
        .setTextColor(new Color("olive"))
        .setTextType(TextType.Large);
      image = new ImageView()
        .setWidth(100)
        .setHeight(100)
        .setBackgroundColor(new Color("red"))
        .setImage("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584021837757&di=bd25e53764af03e95c73c4f8e9d1c19c&imgtype=0&src=http%3A%2F%2Fimg2.thelist.com%2Fimg%2Fgallery%2Fthis-is-what-beyonce-eats-in-a-day%2Fpowered-by-plants-1524075425.jpg")
        .setMode(ImageMode.WidthFix);
      rect.addView(textView);
      rect.addView(image);
      this.layout.addView(rect);
    }
    const relativeLayout = new RelativeLayout()
      .setWidth(300)
      .setHeight(300)
      .setBackgroundColor(new Color("yellow"));
    for (let index = 0; index < 2; index++) {
      const rectAngle = new Rectangle()
        .setWidth(100)
        .setHeight(100)
        .setBorder("1px solid white")
        .setLeft(10 * index)
        .setTop(10 * index)
        .setBackgroundColor(new Color("red"));
      relativeLayout.addView(rectAngle);
    }
    this.layout.addView(relativeLayout);

    const gridLayout = new GridLayout()
      .setWidth(800)
      .setHeight(800)
      .addColumn("100px")
      .addColumn("auto")
      .addRow("1fr")
      .addRow("1fr")
      .setRowGap(10)
      .setColumnGap(10)
      .setBackgroundColor(new Color("purple"));
    const button = new IconButton()
      .setText("Confirm")
      .setBackgroundColor(new Color("blue"))
      .setRadius(15)
      .setRightPadding(5)
      .isRightIcon()
      .setIconSize(26)
      .setImage("resource/image/right_arrow_icon.svg")
      .setTextColor(Color.white);
    const input = new Input()
      .setPlaceholder("enter you email address")
      .setTextType(TextType.Inherit)
      .setPlaceholderColor(new Color("gray"))
      .setWidth(150)
      .setHeight(30)
      .setType(InputType.Password)
      .onFocus(() => {
        console.log("focus");
      })
      .onBlur(() => {
        console.log("blur");
      })
      .onChange(value => {
        console.log(value);
      });
    gridLayout.addView(button, 0, 1);
    gridLayout.addView(input, 1, 1);
    this.layout.addView(gridLayout);
    context.addView(this.layout);
  }
}

new Main().commit();