<template>
  <div class="hold-in" id="newlay">
    <div class="slider-container shadow rounded">
      <BIconCaretDownFill class="fs-2 trigger" />
      <BIconCaretUpFill class="fs-2 triggerTwo" />
      <div class="c-container pt-1">
        <div v-for="item in lootItems" :key="item">
          <div class="c-item" :class="{ win: item._id === winningItem }">
            <LootboxContent class="lootboxItem text-light" :loot="item" />
          </div>
        </div>
      </div>
    </div>
    <WinItemModal :loot="winningItem" :ip="ip" />
  </div>
</template>

<script>
import { BIconCaretDownFill, BIconCaretUpFill } from "bootstrap-icons-vue";
import LootboxContent from "./LootboxContent.vue";
import WinItemModal from "../modals/WinItemModal.vue";
import Modal from "bootstrap/js/dist/modal";
import gsap from "gsap";
import axios from "axios";

export default {
  name: "LootboxSlider",
  props: {
    loot: Object,
    winningItem: String,
    items: Array,
    ip: String,
  },
  components: {
    BIconCaretDownFill,
    BIconCaretUpFill,
    LootboxContent,
    WinItemModal,
  },
  data() {
    return {
      lootItems: [],
    };
  },
  methods: {
    animate() {
      const boxes = gsap.utils.toArray(".c-item");
      const wins = gsap.utils.toArray(".win");

      let winningIndex = boxes.indexOf(wins[0]);
      let viewportWidth = window.innerWidth;

      if (viewportWidth >= 800) {
        if (winningIndex === 0) {
          winningIndex = boxes.length - 2;
        } else if (winningIndex === 1) {
          winningIndex = boxes.length - 1;
        } else {
          winningIndex = winningIndex - 2;
        }
      }

      const randomChanger = Math.floor(Math.random() * 55) / 100;

      let totalLoops = 6;

      const loop = this.horizontalLoop(boxes, { paused: true });

      var spin;

      spin = gsap.timeline({
        paused: true,
        onComplete: openModal,
      });

      spin
        .to(loop, {
          progress: 1,
          repeat: totalLoops - 1,
          duration: totalLoops,
          ease: "none",
        })
        .set(loop, { progress: 0.001 })
        .to(loop, {
          progress: (1 * (winningIndex - randomChanger)) / boxes.length,
          duration: winningIndex - randomChanger + 0.5,
          ease: "none",
        });

      gsap.to(spin, {
        progress: 1,
        duration: 20,
        ease: "circ.inOut",
      });
      function openModal() {
        var myModal = document.getElementById("WinItem");
        const modal = new Modal(myModal);
        modal.show();
      }
    },
    horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
          config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        populateWidths = () =>
          items.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
                gsap.getProperty(el, "xPercent")
            );
          }),
        getTotalWidth = () =>
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          items[length - 1].offsetWidth *
            gsap.getProperty(items[length - 1], "scaleX") +
          (parseFloat(config.paddingRight) || 0),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
      populateWidths();
      gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i) => xPercents[i],
      });
      gsap.set(items, { x: 0 });
      totalWidth = getTotalWidth();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
        vars = vars || {};
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          // if we're wrapping the timeline's playhead, make the proper adjustments
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.updateIndex = () =>
        (curIndex = Math.round(tl.progress() * items.length));
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      if (config.draggable && typeof Draggable === "function") {
        let proxy = document.createElement("div"),
          wrap = gsap.utils.wrap(0, 1),
          ratio,
          startProgress,
          draggable,
          dragSnap,
          roundFactor,
          align = () =>
            tl.progress(
              wrap(startProgress + (draggable.startX - draggable.x) * ratio)
            ),
          syncIndex = () => tl.updateIndex();
        typeof InertiaPlugin === "undefined" &&
          console.warn(
            "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
          );
        draggable = Draggable.create(proxy, {
          trigger: items[0].parentNode,
          type: "x",
          onPress() {
            startProgress = tl.progress();
            tl.progress(0);
            populateWidths();
            totalWidth = getTotalWidth();
            ratio = 1 / totalWidth;
            dragSnap = totalWidth / items.length;
            roundFactor = Math.pow(
              10,
              ((dragSnap + "").split(".")[1] || "").length
            );
            tl.progress(startProgress);
          },
          onDrag: align,
          onThrowUpdate: align,
          inertia: true,
          snap: (value) => {
            let n =
              Math.round(parseFloat(value) / dragSnap) * dragSnap * roundFactor;
            return (n - (n % 1)) / roundFactor;
          },
          onRelease: syncIndex,
          onThrowComplete: () => gsap.set(proxy, { x: 0 }) && syncIndex(),
        })[0];

        tl.draggable = draggable;
      }

      return tl;
    },
  },
  mounted() {
    var array = [];
    this.items.forEach((item) => {
      var newItem = this.loot.find((l) => l._id === item);
      array.push(newItem);
    });
    this.lootItems = array;
    setTimeout(() => {
      this.animate();
    }, 500);
    gsap.fromTo("#newlay", { opacity: 0, duration: 2 }, { opacity: 1 });
  },
};
</script>

<style scoped>
.slider-container {
  height: 275px;
  background: rgb(3, 78, 215);
}
.trigger {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-top: -8px;
  margin-right: auto;
  z-index: 10;
}
.triggerTwo {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 256px;
  z-index: 10;
}
.c-container {
  width: 100%;
  height: 280px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.c-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  color: black;
  font-size: 21px;
  cursor: pointer;
}
.lootboxItem {
  height: 280px;
  width: 240px;
}
</style>
