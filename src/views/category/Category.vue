<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
          ></tab-content-category>

          <div class="tab-control">   
            <div  v-for="(item,indexo) in titles" 
                  :key="indexo" 
                  class="tab-control-item" 
                  :class="{active : indexo === currentIndexo}"
                  @click="itemClick(indexo)"
                  >
              <span>{{item}}</span>
            </div>
          </div>

          <tab-content-detail
            :category-detail="showCategoryDetail"
          ></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
// import TabControl from "components/content/tabControl/TabControl";
import { POP, SELL, NEW } from "common/const";
import { tabControlMixin } from "common/mixin";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    // TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail,
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      categoryDatas: {},
      currentIndex: -1,
      currentIndexo:0,
      titles:['流行','新款','精选'],
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': [],
            },
          };
        }
        console.log(this.categoryData[2])
        console.log(this.categoryData[0])

        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;

      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
        console.log(this.categoryDatas)
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    },
    itemClick(indexo){
      this.currentIndexo = indexo;
      console.log(this.currentIndexo)
    }
  },
  mounted() {

  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

#tab-content {
  /* height: 100%; */
  flex: 1;
  overflow: hidden;
  /* position: absolute; */
  height: calc(100%);
}



 .tab-control{display: flex;text-align: center;height: 40px;line-height: 40px;background: #fff;}
 .tab-control-item{flex: 1;}
  .tab-control-item span{padding: 5px;}
 .active{color: var(--color-high-text);}
 .active span{border-bottom: 3px solid var(--color-high-text);}
</style>
