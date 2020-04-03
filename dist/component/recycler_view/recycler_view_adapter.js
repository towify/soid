/*
 * @author kaysaith
 * @date 2020/3/15 18:10
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _itemCount, _possibleCount, _normalHolderArea, _viewHolders, _movedCount, _invisibleCount, _viewPosition, _beginPassCount, __afterDatasetChanged, _viewHolder, _holderTypes, _normalHolder, _specialHolderTypes, _contentArea, _displayedSpecialHoldersArea, _firstScreenSpecialHolderCount, _footer, _normalHolderDisplayType, _headerSpecialHoldersHeight, _position, _specialHolders, _flipPageCount, _fixedOffset;
import { DisplayType, Orientation } from "../../value/style/style";
import { RecyclerViewHolderType, SpecialViewHolderPosition } from "./recycler_view_holder";
export class RecyclerViewAdapter {
    constructor(context, initialData, orientation = Orientation.Vertical) {
        this.context = context;
        this.initialData = initialData;
        this.orientation = orientation;
        this.data = [];
        _itemCount.set(this, 0);
        _possibleCount.set(this, 0);
        _normalHolderArea.set(this, 0);
        _viewHolders.set(this, []);
        _movedCount.set(this, 1);
        _invisibleCount.set(this, void 0);
        _viewPosition.set(this, []);
        // how many count disappeared that the move engine will start to work
        _beginPassCount.set(this, 2);
        __afterDatasetChanged.set(this, void 0);
        _viewHolder.set(this, void 0);
        _holderTypes.set(this, void 0);
        _normalHolder.set(this, void 0);
        _specialHolderTypes.set(this, []);
        _contentArea.set(this, 0);
        _displayedSpecialHoldersArea.set(this, 0);
        _firstScreenSpecialHolderCount.set(this, 0);
        _footer.set(this, void 0);
        _normalHolderDisplayType.set(this, void 0);
        _headerSpecialHoldersHeight.set(this, 0);
        _position.set(this, 0);
        _specialHolders.set(this, []);
        /**
         * @param offset element scroll top
         * @param isScrollingToMore true means scroll to top
         */
        _flipPageCount.set(this, 0);
        _fixedOffset.set(this, 0);
        this.onCreate();
    }
    reset() {
        __classPrivateFieldSet(this, _footer, undefined);
        __classPrivateFieldSet(this, _headerSpecialHoldersHeight, 0);
        __classPrivateFieldSet(this, _firstScreenSpecialHolderCount, 0);
        __classPrivateFieldSet(this, _displayedSpecialHoldersArea, 0);
        __classPrivateFieldSet(this, _contentArea, 0);
        __classPrivateFieldSet(this, _specialHolderTypes, []);
        __classPrivateFieldSet(this, _viewHolders, []);
        __classPrivateFieldSet(this, _normalHolder, undefined);
        __classPrivateFieldSet(this, _holderTypes, undefined);
        __classPrivateFieldSet(this, _viewPosition, []);
        __classPrivateFieldSet(this, _invisibleCount, undefined);
        __classPrivateFieldSet(this, _specialHolders, []);
        this.data = [];
    }
    getViewByPosition(position) {
        var _a, _b;
        let holder;
        if (__classPrivateFieldGet(this, _specialHolders).length) {
            holder = (_b = (_a = __classPrivateFieldGet(this, _specialHolders)) === null || _a === void 0 ? void 0 : _a.firstOfOrNull(holder => holder.position === position)) === null || _b === void 0 ? void 0 : _b.holder;
            if (!holder) {
                holder = __classPrivateFieldGet(this, _viewHolders)[__classPrivateFieldGet(this, _position) % __classPrivateFieldGet(this, _invisibleCount)];
            }
        }
        else {
            holder = __classPrivateFieldGet(this, _viewHolders)[__classPrivateFieldGet(this, _position) % __classPrivateFieldGet(this, _invisibleCount)];
        }
        return holder;
    }
    recoveryItemPosition() {
        __classPrivateFieldSet(this, _movedCount, 1);
        __classPrivateFieldGet(this, _viewHolders).forEach((holder, index) => {
            if (this.orientation === Orientation.Vertical) {
                holder.setTranslate(0, __classPrivateFieldGet(this, _viewPosition)[index]).updateStyle();
            }
            else {
                holder.setTranslate(__classPrivateFieldGet(this, _viewPosition)[index], 0).updateStyle();
            }
            this.onBindViewHolder(holder, RecyclerViewHolderType.Default, index);
        });
        return this;
    }
    getContentSize() {
        if (__classPrivateFieldGet(this, _itemCount) < __classPrivateFieldGet(this, _possibleCount)) {
            return __classPrivateFieldGet(this, _viewPosition)[__classPrivateFieldGet(this, _viewPosition).length - (__classPrivateFieldGet(this, _possibleCount) - __classPrivateFieldGet(this, _itemCount)) - 1] + __classPrivateFieldGet(this, _normalHolderArea) + this.getArea(__classPrivateFieldGet(this, _footer));
        }
        else {
            return __classPrivateFieldGet(this, _viewPosition).last() + __classPrivateFieldGet(this, _normalHolderArea) + this.getArea(__classPrivateFieldGet(this, _footer));
        }
    }
    afterDatasetChanged(action) {
        __classPrivateFieldSet(this, __afterDatasetChanged, action);
        return this;
    }
    notifyDataChanged() {
        __classPrivateFieldSet(this, _itemCount, this.data.length);
        this.calculateViewPositions(__classPrivateFieldGet(this, _itemCount), false);
        const willUpdateCount = __classPrivateFieldGet(this, _possibleCount);
        willUpdateCount.forEach(value => {
            this.handleMovedItem(__classPrivateFieldGet(this, _invisibleCount) + value);
        });
        __classPrivateFieldSet(this, _movedCount, __classPrivateFieldGet(this, _invisibleCount));
        // update scrollbar size
        __classPrivateFieldSet(this, _contentArea, this.getContentSize());
        !__classPrivateFieldGet(this, __afterDatasetChanged) || __classPrivateFieldGet(this, __afterDatasetChanged).call(this);
        this.handleFooterHolder();
    }
    updateItemCountIfNeed() {
        const newPossible = Math.ceil(this.getArea(this.context) / __classPrivateFieldGet(this, _normalHolderArea)) + __classPrivateFieldGet(this, _beginPassCount);
        const newCount = newPossible - __classPrivateFieldGet(this, _possibleCount);
        if (newCount > 0) {
            let temporary;
            let position;
            newCount.forEach(index => {
                position = __classPrivateFieldGet(this, _viewPosition)[__classPrivateFieldGet(this, _possibleCount) + index];
                temporary = new (__classPrivateFieldGet(this, _normalHolder))();
                if (position) {
                    if (this.orientation === Orientation.Vertical) {
                        temporary.setTranslate(0, position);
                    }
                    else {
                        temporary.setTranslate(position, 0);
                    }
                }
                else {
                    temporary.setDisplay(DisplayType.None);
                }
                __classPrivateFieldGet(this, _viewHolders).push(temporary);
                this.context.addView(temporary);
            });
            __classPrivateFieldSet(this, _possibleCount, newPossible);
        }
    }
    updateData(newData) {
        this.data = this.data.concat(newData);
        return this;
    }
    onScroll(offset, isScrollingToPast) {
        __classPrivateFieldSet(this, _fixedOffset, offset - __classPrivateFieldGet(this, _displayedSpecialHoldersArea));
        __classPrivateFieldSet(this, _invisibleCount, Math.floor((__classPrivateFieldGet(this, _fixedOffset) < 0 ? 0 : __classPrivateFieldGet(this, _fixedOffset)) / __classPrivateFieldGet(this, _normalHolderArea)));
        __classPrivateFieldSet(this, _flipPageCount, __classPrivateFieldGet(this, _invisibleCount) + (__classPrivateFieldGet(this, _possibleCount) - __classPrivateFieldGet(this, _firstScreenSpecialHolderCount)));
        if (__classPrivateFieldGet(this, _invisibleCount) > __classPrivateFieldGet(this, _movedCount) &&
            __classPrivateFieldGet(this, _itemCount) > __classPrivateFieldGet(this, _possibleCount) &&
            !isScrollingToPast) {
            __classPrivateFieldSet(this, _position, __classPrivateFieldGet(this, _invisibleCount) + __classPrivateFieldGet(this, _possibleCount) - __classPrivateFieldGet(this, _beginPassCount));
            if (__classPrivateFieldGet(this, _position) < __classPrivateFieldGet(this, _itemCount)) {
                this.handleMovedItem(__classPrivateFieldGet(this, _position));
                __classPrivateFieldSet(this, _movedCount, __classPrivateFieldGet(this, _invisibleCount));
            }
        }
        else {
            if (isScrollingToPast) {
                if (__classPrivateFieldGet(this, _invisibleCount) < __classPrivateFieldGet(this, _movedCount) &&
                    __classPrivateFieldGet(this, _invisibleCount) > 0) {
                    __classPrivateFieldSet(this, _position, __classPrivateFieldGet(this, _invisibleCount));
                    this.handleMovedItem(__classPrivateFieldGet(this, _position));
                    __classPrivateFieldSet(this, _movedCount, __classPrivateFieldGet(this, _position));
                }
                if (offset < __classPrivateFieldGet(this, _normalHolderArea) + __classPrivateFieldGet(this, _headerSpecialHoldersHeight)) {
                    this.handleMovedItem(0);
                }
            }
        }
    }
    /**
     * @description
     * `moreCount`  is used to mark whether an element that needs additional
     * display has been loaded
     */
    onCreate() {
        __classPrivateFieldSet(this, _holderTypes, this.getViewHoldersTypeWithPositions());
        this.data = this.data.concat(this.initialData);
        __classPrivateFieldSet(this, _itemCount, this.data.length);
        let temporaryHolder;
        let specialHolderArea;
        // Prepare data for Special and Normal Holder
        __classPrivateFieldGet(this, _holderTypes).forEach(type => {
            if (type.position > 0 || SpecialViewHolderPosition.indexOf(type.position) >= 0) {
                __classPrivateFieldGet(this, _specialHolderTypes).push(type);
            }
            else {
                __classPrivateFieldSet(this, _normalHolder, type.holder);
                if (!__classPrivateFieldGet(this, _normalHolderArea)) {
                    let temporary = new (__classPrivateFieldGet(this, _normalHolder))();
                    __classPrivateFieldSet(this, _normalHolderArea, this.getArea(temporary));
                    __classPrivateFieldSet(this, _normalHolderDisplayType, temporary === null || temporary === void 0 ? void 0 : temporary.displayType);
                    temporary = null;
                }
            }
        });
        this.handleSpecialHolders();
        // The number of multiplexed cells is the maximum number of normal cells
        // that can be displayed in the display area, and an additional 2 are added.
        __classPrivateFieldSet(this, _possibleCount, Math.ceil(this.getArea(this.context) / __classPrivateFieldGet(this, _normalHolderArea)) + __classPrivateFieldGet(this, _beginPassCount));
        // Ready to initialize the first screen of data
        __classPrivateFieldGet(this, _possibleCount).forEach(index => {
            var _a;
            specialHolderArea =
                this.getArea((_a = __classPrivateFieldGet(this, _specialHolderTypes)) === null || _a === void 0 ? void 0 : _a.firstOfOrNull(special => special.position === index));
            if (specialHolderArea) {
                if (index <= 1) {
                    __classPrivateFieldSet(this, _headerSpecialHoldersHeight, __classPrivateFieldGet(this, _headerSpecialHoldersHeight) + specialHolderArea);
                }
                __classPrivateFieldSet(this, _firstScreenSpecialHolderCount, __classPrivateFieldGet(this, _firstScreenSpecialHolderCount) + 1);
                __classPrivateFieldSet(this, _displayedSpecialHoldersArea, __classPrivateFieldGet(this, _displayedSpecialHoldersArea) + specialHolderArea);
            }
            temporaryHolder = new (__classPrivateFieldGet(this, _normalHolder))();
            // If the number of cells on the first page is not realistic enough, then the
            // created cells will be temporarily hidden and displayed when new data is
            // updated.
            if (index >= __classPrivateFieldGet(this, _itemCount)) {
                temporaryHolder.setDisplay(DisplayType.None);
            }
            __classPrivateFieldGet(this, _viewHolders).push(temporaryHolder);
        });
        this.calculateViewPositions(__classPrivateFieldGet(this, _possibleCount), true);
        this.handleFooterHolder();
    }
    handleMovedItem(position) {
        __classPrivateFieldSet(this, _viewHolder, __classPrivateFieldGet(this, _viewHolders)[position % __classPrivateFieldGet(this, _possibleCount)]);
        __classPrivateFieldGet(this, _viewHolder).setDisplay(DisplayType.None)
            .updateStyle();
        if (this.orientation === Orientation.Vertical) {
            __classPrivateFieldGet(this, _viewHolder).setTranslate(0, __classPrivateFieldGet(this, _viewPosition)[position]);
        }
        else {
            __classPrivateFieldGet(this, _viewHolder).setTranslate(__classPrivateFieldGet(this, _viewPosition)[position], 0);
        }
        this.onBindViewHolder(__classPrivateFieldGet(this, _viewHolder), RecyclerViewHolderType.Default, position);
        __classPrivateFieldGet(this, _viewHolder).setDisplay(__classPrivateFieldGet(this, _normalHolderDisplayType) || DisplayType.Block)
            .updateStyle();
    }
    handleSpecialHolders() {
        let specialHolder;
        //  Special Holder is loaded directly into the real place without reusing logic,
        //  and is not changed.
        __classPrivateFieldGet(this, _specialHolderTypes).sort((left, right) => left.position - right.position)
            .forEach((special, index) => {
            // Handle footer when all holders have been processed
            specialHolder = new special.holder();
            // Store it for getting holder by position method
            __classPrivateFieldGet(this, _specialHolders).push({ position: special.position, holder: specialHolder });
            if (special.position === RecyclerViewHolderType.Footer) {
                __classPrivateFieldSet(this, _footer, specialHolder);
                __classPrivateFieldGet(this, _footer).setDisplay(DisplayType.None);
            }
            else {
                if (special.position === RecyclerViewHolderType.Header) {
                    special.y = 0;
                    special.x = 0;
                }
                else {
                    const preHolderType = __classPrivateFieldGet(this, _specialHolderTypes)[index - 1];
                    if (this.orientation === Orientation.Vertical) {
                        special.y = preHolderType.y + preHolderType.height +
                            (special.position - preHolderType.position - 1) * __classPrivateFieldGet(this, _normalHolderArea);
                    }
                    else {
                        special.x = preHolderType.x + preHolderType.width +
                            (special.position - preHolderType.position - 1) * __classPrivateFieldGet(this, _normalHolderArea);
                    }
                }
                special.height = specialHolder.height;
                special.width = specialHolder.width;
                if (this.orientation === Orientation.Vertical) {
                    specialHolder.setTranslate(0, special.y);
                }
                else {
                    specialHolder.setTranslate(special.x, 0);
                }
            }
            this.onBindViewHolder(specialHolder, special.position);
            this.context.addView(specialHolder);
        });
    }
    handleFooterHolder() {
        if (!__classPrivateFieldGet(this, _footer) || !__classPrivateFieldGet(this, _viewPosition).length)
            return;
        // The footer is based on the last cell that has been displayed to determine
        // the display position.
        let footerPosition;
        if (__classPrivateFieldGet(this, _itemCount) < __classPrivateFieldGet(this, _possibleCount)) {
            footerPosition = __classPrivateFieldGet(this, _viewPosition)[__classPrivateFieldGet(this, _viewPosition).length - (__classPrivateFieldGet(this, _possibleCount) - __classPrivateFieldGet(this, _itemCount)) - 1];
        }
        else {
            footerPosition = __classPrivateFieldGet(this, _viewPosition).last();
        }
        if (this.orientation === Orientation.Vertical) {
            __classPrivateFieldGet(this, _footer).setTranslate(0, footerPosition + __classPrivateFieldGet(this, _normalHolderArea));
        }
        else {
            __classPrivateFieldGet(this, _footer).setTranslate(footerPosition + __classPrivateFieldGet(this, _normalHolderArea), 0);
        }
        __classPrivateFieldGet(this, _footer).setDisplay(DisplayType.Block).updateStyle();
    }
    calculateViewPositions(itemCount, isInitial) {
        __classPrivateFieldSet(this, _viewPosition, []);
        const prepareNormalHolderEvent = (index) => {
            const targetHolder = __classPrivateFieldGet(this, _viewHolders)[index % __classPrivateFieldGet(this, _possibleCount)];
            if (this.orientation === Orientation.Vertical) {
                targetHolder.setTranslate(0, __classPrivateFieldGet(this, _viewPosition)[index]);
            }
            else {
                targetHolder.setTranslate(__classPrivateFieldGet(this, _viewPosition)[index], 0);
            }
            this.onBindViewHolder(targetHolder, -1, index);
            this.context.addView(targetHolder);
        };
        let positionArea;
        let ignorePosition;
        // If it is a position-connected Item, you need to recursively calculate their
        // cumulative height and mark the position of this connection. You do not
        // need to add the Ignore Position tag of the Normal Item.
        const recursionConnectedArea = (special) => {
            const nextSpecial = __classPrivateFieldGet(this, _specialHolderTypes).firstOfOrNull(item => item.position === (special.position + 1));
            if (nextSpecial) {
                ignorePosition = nextSpecial.position;
                positionArea = recursionConnectedArea(nextSpecial);
                return positionArea;
            }
            else {
                positionArea = this.orientation === Orientation.Vertical ?
                    special.y + special.height :
                    special.x + special.width;
                return positionArea;
            }
        };
        let special;
        const markSpecialPositionIfNeed = (index) => {
            var _a;
            special = (_a = __classPrivateFieldGet(this, _specialHolderTypes)) === null || _a === void 0 ? void 0 : _a.firstOfOrNull(item => {
                return (item.position - markedSpecialPositionCount) === index;
            });
            if (special) {
                targetArea = recursionConnectedArea(special);
                __classPrivateFieldGet(this, _viewPosition).push(targetArea);
                markedSpecialPositionCount += 1;
            }
            else {
                __classPrivateFieldGet(this, _viewPosition).push((__classPrivateFieldGet(this, _viewPosition).last() || 0) + __classPrivateFieldGet(this, _normalHolderArea));
            }
        };
        let targetArea;
        let markedSpecialPositionCount = 0;
        itemCount.forEach(index => {
            var _a;
            if (index === 0) {
                special = (_a = __classPrivateFieldGet(this, _specialHolderTypes)) === null || _a === void 0 ? void 0 : _a.firstOfOrNull(item => item.position === index);
                if (special) {
                    markedSpecialPositionCount += 1;
                    targetArea = recursionConnectedArea(special);
                    __classPrivateFieldGet(this, _viewPosition).push(targetArea);
                }
                else {
                    __classPrivateFieldGet(this, _viewPosition).push(0);
                }
            }
            else {
                if (ignorePosition && ignorePosition >= index) {
                    markedSpecialPositionCount += 1;
                    markSpecialPositionIfNeed(index);
                    ignorePosition = undefined;
                }
                else {
                    markSpecialPositionIfNeed(index);
                }
            }
            if (isInitial) {
                prepareNormalHolderEvent(index);
            }
        });
    }
    getArea(target) {
        if (this.orientation === Orientation.Vertical) {
            return (target === null || target === void 0 ? void 0 : target.height) || 0;
        }
        else {
            return (target === null || target === void 0 ? void 0 : target.width) || 0;
        }
    }
}
_itemCount = new WeakMap(), _possibleCount = new WeakMap(), _normalHolderArea = new WeakMap(), _viewHolders = new WeakMap(), _movedCount = new WeakMap(), _invisibleCount = new WeakMap(), _viewPosition = new WeakMap(), _beginPassCount = new WeakMap(), __afterDatasetChanged = new WeakMap(), _viewHolder = new WeakMap(), _holderTypes = new WeakMap(), _normalHolder = new WeakMap(), _specialHolderTypes = new WeakMap(), _contentArea = new WeakMap(), _displayedSpecialHoldersArea = new WeakMap(), _firstScreenSpecialHolderCount = new WeakMap(), _footer = new WeakMap(), _normalHolderDisplayType = new WeakMap(), _headerSpecialHoldersHeight = new WeakMap(), _position = new WeakMap(), _specialHolders = new WeakMap(), _flipPageCount = new WeakMap(), _fixedOffset = new WeakMap();
