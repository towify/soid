/*
 * @author kaysaith
 * @date 2020/3/11 12:33
 */

import { Fragment } from "./base/fragment/fragment";
import { Color } from "./value/color";
import { LinearLayout } from "./component/linear_layout";
import { ViewGroup } from "./base/view_group";
import { Align, Orientation, StyleTag } from "./value/style/style";
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
import { RecyclerViewAdapter } from "./component/recycler_view/recycler_view_adapter";
import { print } from "./service/print_service";
import {
  RecyclerViewHolder,
  RecyclerViewHolderModel,
  RecyclerViewHolderType
} from "./component/recycler_view/recycler_view_holder";
import { Swiper } from "./component/swiper/swiper";
import { SegmentContainer, TabsType } from "./component/segment/segment_container";
import { SegmentMenu } from "./component/segment/segment_menu";
import { FolderItem, FolderView } from "./component/folder/folder_view";

const cellWidth = 200;

export class Main extends App {
  constructor() {
    super();
  }

  protected async onCreate(): Promise<void> {
    const fragment = new Text();
    await this.addFragment(new ChildFragmentModel(fragment, true));
  }
}

class Test2 extends Fragment {
  protected async onCreateView(context: ViewGroup): Promise<void> {
    context.setWidth(500).setHeight(500);
    context.addView(new TextView().setFullParent().setBackgroundColor(new Color("blue")));
  }
}

class Test3 extends Fragment {
  protected async onCreateView(context: ViewGroup): Promise<void> {
    context.setWidth(500).setHeight(500);
    context.addView(new TextView().setFullParent().setBackgroundColor(new Color("red")));
  }
}

class Text extends Fragment {
  private layout = new LinearLayout(Orientation.Horizontal);
  private test2 = new Test2();
  private test3 = new Test3();

  protected async onCreateView(context: ViewGroup): Promise<void> {
    this.layout
      .setWidth(900)
      .setBorder("2px solid yellow")
      .setBackgroundColor(Color.black);
    print.register("board1").register("board2").mount(this.layout);
    this.addFragment(this.test2);
    let rect;
    let textView;
    let image;
    for (let index = 0; index < 2; index++) {
      rect = new ViewGroup()
        .setWidth(100)
        .setHeight(50 * index)
        .setBackgroundColor(Color.white)
        .setMargin("10px")
        .onClick(() => {
          this.replaceFragment(this.test3, this.test2);
          setTimeout(() => {
            this.replaceFragment(this.test2, this.test3);
          }, 3000);
        });
      if (index === 1) {
        rect
          .setScale(1.2, 1.2)
          .setRotate(10);
      }
      textView = new TextView()
        .setText(`Hello ${index}`, {
          start: 2,
          end: 5,
          hold: style => {
            style.addRule(StyleTag.Color, "red");
          }
        })
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
      .setClass("test")
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
      .getClearButton(button => {
      })
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

    const recyclerView = new MyRecyclerView().setWidth(cellWidth);
    recyclerView.adapter = new MyRecyclerViewAdapter(
      recyclerView,
      ["Hello 1", "Hello 2", "Hello3", "Hello 4", "Hello 5", "Hello 6", "Hello 7", "Hello 8", "Hello 9"]
    );

    // const horizontalRecyclerView = new MyRecyclerView().setWidth(400);
    // horizontalRecyclerView.adapter = new MyRecyclerViewAdapter(
    //   horizontalRecyclerView,
    //   ["Hello 1", "Hello 2", "Hello3", "Hello 4", "Hello 5", "Hello 6", "Hello 7", "Hello 8", "Hello 9"],
    //   Orientation.Horizontal
    // );

    let hasLoadPage = false;
    let pageCount = 4;
    recyclerView.onReachedEnd(() => {
      if (hasLoadPage || !pageCount) return;
      hasLoadPage = true;
      const footerView = recyclerView.adapter?.getViewByPosition<MyRecyclerFooterView>(RecyclerViewHolderType.Footer);
      !footerView || (footerView.model = "loading now");
      setTimeout(async () => {
        pageCount -= 1;
        !footerView || (footerView.model = "footer view");
        recyclerView.adapter?.updateData(await this.prepareData());
        recyclerView.adapter?.notifyDataChanged();
        hasLoadPage = false;
      }, 3000);
    });

    const swiper = new Swiper<TextView>()
      .setWidth(400)
      .setHeight(250)
      .setBackgroundColor(new Color("purple"))
      .setItemType(TextView)
      .setData<Color>(
        [new Color("red"), new Color("olive"), new Color("purple"), new Color("blue")],
        (slider, model) => {
          slider
            .setBackgroundColor(model)
            .onClick(() => {
              console.log(model);
            });
        });

    const data = [
      {data: "Left", page: LinearLayout},
      {data: "Center", page: LinearLayout},
      {data: "Right", page: LinearLayout}
    ];
    const segment = new SegmentContainer<TextView>(TabsType.TopFixed)
      .setBackgroundColor(Color.white)
      .setItemContainerSize(100)
      .setWidth(500)
      .setHeight(800)
      .setItemType(TextView)
      .setData(data,
        (item, position) => {
          item
            .setBorder("1px solid #000")
            .setTextAlign(Align.Center)
            .setText(data[position].data)
            .onClick(_ => {
              segment.showPageByPosition(position);
            });
        }
      );

    const menu = ["Page 1", "Page 2"];
    const segmentMenu = new SegmentMenu<TextView>(TabsType.TopFixed)
      .setWidth(200)
      .setHeight(100)
      .setItemType(TextView)
      .setData(menu, ((item, position) => {
        item
          .setBackgroundColor(Color.white)
          .setText(menu[position])
          .onClick(_ => {
            console.log(item.textContent);
          });
      }));

    const foldView = new FolderView()
      .setWidth(200)
      .setHeight(300)
      .setBackgroundColor(new Color("olive"))
      .addItem(new FolderItem()
        .setID(`${new Date().getTime()}`)
        .setPercentWidth(100)
        .setModel({
          iconPath: "./resource/image/image_icon.svg",
          title: "Login Page",
          isParent: true
        }));
    const item = () => {
      return new FolderItem()
        .setID(`${new Date().getTime()}`)
        .setPercentWidth(100)
        .setModel({
          iconPath: "./resource/image/image_icon.svg",
          title: "Login Page",
          isParent: true
        });
    };
    foldView.onClick(event => {
      const parent = event.target as HTMLDivElement;
      foldView.addItem(item(), parent.id);
    });

    this.layout.addView(relativeLayout);
    this.layout.addView(gridLayout);
    this.layout.addView(recyclerView);
    // this.layout.addView(horizontalRecyclerView);
    this.layout.addView(swiper);
    this.layout.addView(segment);
    this.layout.addView(segmentMenu);
    this.layout.addView(foldView);
    context.addView(this.layout);

    this.afterResized(_ => {
      recyclerView.setHeight(1000).updateStyle();
      recyclerView.adapter?.updateItemCountIfNeed();
    });
  }

  private async prepareData(): Promise<any[]> {
    const dataCount = 10;
    const result: any[] = [];
    dataCount.forEach(_ => {
      result.push(`New Data ${Math.floor(Math.random() * 100000000)}`);
    });
    return result;
  }
}

class MyRecyclerView extends RecyclerView {
  constructor() {
    super();
    this.setHeight(700);
  }
}

class MyRecyclerViewAdapter extends RecyclerViewAdapter {

  public getViewHoldersTypeWithPositions(): RecyclerViewHolderModel[] {
    return [
      new RecyclerViewHolderModel(MyRecyclerHeaderView, RecyclerViewHolderType.Header),
      // new RecyclerViewHolderModel(MyRecyclerHeaderView, 2),
      // new RecyclerViewHolderModel(MyRecyclerFooterView, 4),
      // new RecyclerViewHolderModel(MyRecyclerHeaderView, 7),
      new RecyclerViewHolderModel(MyRecyclerViewCell),
      new RecyclerViewHolderModel(MyRecyclerFooterView, RecyclerViewHolderType.Footer)
    ];
  }

  public onBindViewHolder(
    viewHolder: MyRecyclerViewCell,
    type: number,
    dataIndex: number
  ): void {
    switch (type) {
      case RecyclerViewHolderType.Header: {
        viewHolder.model = "I Am a Header View";
        break;
      }
      case 2: {
        viewHolder.model = "shit you";
        break;
      }
      case 4: {
        viewHolder.model = "what happened";
        break;
      }
      case 7: {
        viewHolder.model = "66666";
        break;
      }
      case RecyclerViewHolderType.Footer: {
        viewHolder
          .setBackgroundColor(new Color("teal"));
        viewHolder.model = "I am a foot view";
        break;
      }
      default: {
        viewHolder.model = this.data[dataIndex];
      }
    }
  }
}

class MyRecyclerViewCell extends RecyclerViewHolder {
  #textView = new TextView();

  constructor() {
    super();
    this
      .setBorder("1px solid black")
      .setBackgroundColor(new Color("gray"));
    this.#textView
      .setFullParent()
      .setTextType(TextType.Inherit);
    this.addView(this.#textView);
  }

  set model(model: string) {
    this.#textView.setText(model);
  }

  public getSize() {
    return {width: cellWidth, height: 50};
  }
}

class MyRecyclerHeaderView extends RecyclerViewHolder {
  #textView = new TextView();

  constructor() {
    super();
    this
      .setBorder("1px solid red")
      .setBackgroundColor(new Color("olive"));
    this.#textView
      .setFullParent()
      .setTextType(TextType.Inherit);
    this.addView(this.#textView);
  }

  set model(model: string) {
    this.#textView.setText(model);
  }

  public getSize() {
    return {width: cellWidth, height: 300};
  }
}

class MyRecyclerFooterView extends RecyclerViewHolder {
  #textView = new TextView();

  constructor() {
    super();
    this
      .setBorder("1px solid red")
      .setBackgroundColor(new Color("yellow"));
    this.#textView
      .setFullParent()
      .setTextType(TextType.Inherit);
    this.addView(this.#textView);
  }

  set model(model: string) {
    this.#textView.setText(model);
  }

  public getSize() {
    return {width: cellWidth, height: 100};
  }
}

new Main().commit();