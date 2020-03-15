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
import { Selection } from "./component/selection/selection";
import { RecyclerView } from "./component/recycler_view/recycler_view";
import {
  RecyclerViewAdapter,
  RecyclerViewAdapterModel,
  RecyclerViewHolder
} from "./component/recycler_view/recycler_view_adapter";

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
      if (index === 1) {
        rect
          .setScale(1.2, 1.2)
          .setRotate(10);
      }
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
      .setTextType(TextType.Small)
      .setRadius(15)
      .setBorder("2px solid gray")
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
    const selection = new Selection()
      .setWidth(150)
      .setHeight(30)
      .setTop(100)
      .setBackgroundColor(Color.white)
      .setOptionHeight(30)
      .setHorizontalPadding(10)
      .setOptionSelectedBackgroundColor(new Color("olive"))
      .setData(["Jack Bos", "Hello Kitty", "Amazing Kiss"], 2)
      .onClickOption(value => {
        console.log(value, "value");
      });
    gridLayout.addView(button, 0, 1);
    gridLayout.addView(input, 1, 1);
    gridLayout.addView(selection, 1, 1);

    const recyclerView = new MyRecyclerView();
    recyclerView.adapter =
      new MyRecyclerViewAdapter(
        recyclerView,
        [
          new MyRecyclerViewModel("hello baby 1"),
          new MyRecyclerViewModel("hello leo 2"),
          new MyRecyclerViewModel("hello lily 3"),
          new MyRecyclerViewModel("hello leo 4"),
          new MyRecyclerViewModel("hello baby 5"),
          new MyRecyclerViewModel("hello leo 6"),
          new MyRecyclerViewModel("hello lily 7"),
          new MyRecyclerViewModel("hello leo 8")
        ]
      );
    this.layout.addView(relativeLayout);
    this.layout.addView(gridLayout);
    this.layout.addView(recyclerView);
    context.addView(this.layout);
  }
}

class MyRecyclerView extends RecyclerView<MyRecyclerViewCell, MyRecyclerViewModel> {
  constructor() {
    super();
    this
      .setWidth(900)
      .setHeight(800)
      .setBackgroundColor(Color.white);
  }
}

class MyRecyclerViewAdapter extends RecyclerViewAdapter<MyRecyclerViewCell, MyRecyclerViewModel> {
  constructor(
    context: MyRecyclerView,
    protected readonly data: MyRecyclerViewModel[]
  ) {
    super(context, data);
  }

  generateViewHolder(): MyRecyclerViewCell {
    return new MyRecyclerViewCell();
  }

  onBindViewHolder(viewHolder: MyRecyclerViewCell, position: number): void {
    viewHolder.model = this.data[position];
  }
}

class MyRecyclerViewModel extends RecyclerViewAdapterModel {
  constructor(public readonly value: string) {
    super();
  }
}

class MyRecyclerViewCell extends RecyclerViewHolder<MyRecyclerViewModel> {
  #textView = new TextView();

  constructor() {
    super();
    this
      .setPercentWidth(100)
      .setBorder("1px solid black")
      .setBackgroundColor(new Color("gray"));
    this.#textView
      .setFullParent()
      .setTextType(TextType.Inherit);
    this.addView(this.#textView);
  }

  public getHeight(): number {
    return 350;
  }

  protected onDidSetModel(model: MyRecyclerViewModel): void {
    this.#textView.setText(model.value);
  }
}

new Main().commit();