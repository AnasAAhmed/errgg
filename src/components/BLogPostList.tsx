import { CSSProperties, useMemo } from "react";

export type BlogPostListType = {
  className?: string;
};

const BlogPostList = ({ className = "" }:BlogPostListType) => {
  return (
    <div
      className={`w-[77.688rem] flex flex-col md:flex-row items-start justify-start gap-[1.875rem] max-w-full text-left text-[1rem] text-darkgray font-poppins mq1150:flex-wrap ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start pt-[1.375rem] px-[0rem] pb-[0rem] box-border max-w-full mq800:min-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[3.375rem] max-w-full z-[1] mq450:gap-[1.688rem]">
          <GroupComponent13
            previewImages="https://figma-to-code-ecom-design.vercel.app/rectangle-68@2x.png"
            wood="Wood"
            goingAllInWithMillennialD="Going all-in with millennial design"
          />
          <GroupComponent13
            previewImages="https://figma-to-code-ecom-design.vercel.app/rectangle-68-1@2x.png"
            wood="Handmade"
            goingAllInWithMillennialD="Exploring new ways of decorating"
            propWidth="24.563rem"
            propFlex="1"
            propMinWidth="4.938rem"
            propFlex1="1"
            propMinWidth1="4.938rem"
            propMinWidth2="5.688rem"
          />
          <GroupComponent13
            previewImages="https://figma-to-code-ecom-design.vercel.app/rectangle-68-2@2x.png"
            wood="Wood"
            goingAllInWithMillennialD="Handmade pieces that took time to make"
            propWidth="unset"
            propFlex="unset"
            propMinWidth="unset"
            propFlex1="unset"
            propMinWidth1="unset"
            propMinWidth2="2.938rem"
          />
        </div>
      </div>
      <div className="w-[24.563rem] flex flex-col sm:items-start justify-start gap-[2.562rem] sm:min-w-[24.563rem] max-w-full text-[1.5rem] text-black mq450:gap-[1.25rem] mq800:min-w-full mq1150:flex-1">
        <div className="self-stretch bg-white flex flex-col items-end justify-start pt-[1.375rem] px-[2.562rem] pb-[3.812rem] box-border gap-[2.625rem] max-w-full z-[1] mq450:gap-[1.313rem] mq800:pt-[1.25rem] mq800:pb-[2.5rem] mq800:box-border">
          <div className="w-[24.563rem] h-[33.563rem] relative bg-white hidden max-w-full" />
          <div className="self-stretch rounded-3xs bg-white flex flex-row items-start justify-end py-[0.937rem] px-[0.625rem] z-[1] border-[1px] border-solid border-darkgray">
            <div className="h-[3.625rem] w-[19.438rem] relative rounded-3xs bg-white box-border hidden border-[1px] border-solid border-darkgray" />
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="https://figma-to-code-ecom-design.vercel.app/akariconssearch-1.svg"
            />
          </div>
          <div className="w-[18.688rem] flex flex-row items-start justify-end py-[0rem] px-[1.5rem] box-border">
            <div className="flex-1 flex flex-col items-start justify-start gap-[2.062rem] mq450:gap-[1rem]">
              <h3 className="m-0 relative text-inherit font-medium font-inherit z-[1] mq450:text-[1.188rem]">
                Categories
              </h3>
              <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] text-[1rem] text-darkgray">
                <div className="flex flex-col items-start justify-start gap-[2.562rem]">
                  <div className="relative inline-block min-w-[3.063rem] z-[1]">
                    Crafts
                  </div>
                  <div className="relative inline-block min-w-[3.438rem] z-[1]">
                    Design
                  </div>
                  <div className="relative inline-block min-w-[5.688rem] z-[1]">
                    Handmade
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[2.562rem]">
                  <div className="relative inline-block min-w-[0.625rem] z-[1]">
                    2
                  </div>
                  <div className="relative inline-block min-w-[0.688rem] z-[1]">
                    8
                  </div>
                  <div className="relative inline-block min-w-[0.563rem] z-[1]">
                    7
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[18.688rem] flex flex-row items-start justify-end py-[0rem] px-[1.5rem] box-border text-[1rem] text-darkgray">
            <div className="flex-1 flex flex-row items-start justify-between gap-[1.25rem]">
              <div className="flex flex-col items-start justify-start gap-[2.562rem]">
                <div className="relative inline-block min-w-[3.563rem] z-[1]">
                  Interior
                </div>
                <div className="relative inline-block min-w-[2.938rem] z-[1]">
                  Wood
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[2.562rem]">
                <div className="relative inline-block min-w-[0.375rem] z-[1]">
                  1
                </div>
                <div className="relative inline-block min-w-[0.688rem] z-[1]">
                  6
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch bg-white flex flex-col items-start justify-start py-[1rem] pr-[4.062rem] sm:pl-[4.75rem] box-border gap-[1.625rem] max-w-full z-[1] text-[0.875rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
          <div className="w-[24.563rem] h-[40.625rem] relative bg-white hidden max-w-full" />
          <div className="flex flex-row items-start justify-start py-[0rem] px-[0.062rem] text-[1.5rem]">
            <h3 className="m-0 relative text-inherit font-medium font-inherit z-[1] mq450:text-[1.188rem]">
              Recent Posts
            </h3>
          </div>
          <div className="w-[13.188rem] flex flex-row items-end justify-start pt-[0rem] px-[0rem] pb-[0.812rem] box-border gap-[0.75rem]">
            <img
              className="h-[5rem] w-[5rem] relative rounded-3xs object-cover z-[1]"
              loading="lazy"
              alt=""
              src="https://figma-to-code-ecom-design.vercel.app/rectangle-69@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="self-stretch relative z-[1]">
                  Going all-in with millennial design
                </div>
                <div className="self-stretch relative text-[0.75rem] text-darkgray z-[1]">
                  03 Aug 2022
                </div>
              </div>
            </div>
          </div>
          <div className="w-[15.063rem] flex flex-row items-end justify-start pt-[0rem] px-[0rem] pb-[0.812rem] box-border gap-[0.75rem]">
            <img
              className="h-[5rem] w-[5rem] relative rounded-3xs object-cover z-[1]"
              loading="lazy"
              alt=""
              src="https://figma-to-code-ecom-design.vercel.app/rectangle-69-1@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="self-stretch relative z-[1]">
                  Exploring new ways of decorating
                </div>
                <div className="w-[7.438rem] relative text-[0.75rem] text-darkgray inline-block z-[1]">
                  03 Aug 2022
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-end justify-start pt-[0rem] px-[0rem] pb-[0.812rem] gap-[0.75rem]">
            <img
              className="h-[5rem] w-[5rem] relative rounded-3xs object-cover z-[1]"
              loading="lazy"
              alt=""
              src="https://figma-to-code-ecom-design.vercel.app/rectangle-69-2@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="self-stretch relative z-[1]">
                  Handmade pieces that took time to make
                </div>
                <div className="w-[7.438rem] relative text-[0.75rem] text-darkgray inline-block z-[1]">
                  03 Aug 2022
                </div>
              </div>
            </div>
          </div>
          <div className="w-[13.188rem] flex flex-row items-end justify-start pt-[0rem] px-[0rem] pb-[0.812rem] box-border gap-[0.75rem]">
            <img
              className="h-[5rem] w-[5rem] relative rounded-3xs object-cover z-[1]"
              loading="lazy"
              alt=""
              src="https://figma-to-code-ecom-design.vercel.app/rectangle-69-3@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="self-stretch relative z-[1]">
                  Modern home in Milan
                </div>
                <div className="self-stretch relative text-[0.75rem] text-darkgray z-[1]">
                  03 Aug 2022
                </div>
              </div>
            </div>
          </div>
          <div className="w-[13.188rem] flex flex-row items-end justify-start gap-[0.75rem]">
            <img
              className="h-[5rem] w-[5rem] relative rounded-3xs object-cover z-[1]"
              loading="lazy"
              alt=""
              src="https://figma-to-code-ecom-design.vercel.app/rectangle-69-4@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="self-stretch relative z-[1]">
                  Colorful office redesign
                </div>
                <div className="self-stretch relative text-[0.75rem] text-darkgray z-[1]">
                  03 Aug 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export type GroupComponent13Type = {
    className?: string;
    previewImages?: string;
    wood?: string;
    goingAllInWithMillennialD?: string;
  
    /** Style props */
    propWidth?: CSSProperties["width"];
    propFlex?: CSSProperties["flex"];
    propMinWidth?: CSSProperties["minWidth"];
    propFlex1?: CSSProperties["flex"];
    propMinWidth1?: CSSProperties["minWidth"];
    propMinWidth2?: CSSProperties["minWidth"];
  };
  
  const GroupComponent13 = ({
    className = "",
    previewImages,
    wood,
    goingAllInWithMillennialD,
    propWidth,
    propFlex,
    propMinWidth,
    propFlex1,
    propMinWidth1,
    propMinWidth2,
  }:GroupComponent13Type) => {
    const postCategoriesStyle: CSSProperties = useMemo(() => {
      return {
        width: propWidth,
      };
    }, [propWidth]);
  
    const dateIconsStyle: CSSProperties = useMemo(() => {
      return {
        flex: propFlex,
        minWidth: propMinWidth,
      };
    }, [propFlex, propMinWidth]);
  
    const tagIconsStyle: CSSProperties = useMemo(() => {
      return {
        flex: propFlex1,
        minWidth: propMinWidth1,
      };
    }, [propFlex1, propMinWidth1]);
  
    const woodStyle: CSSProperties = useMemo(() => {
      return {
        minWidth: propMinWidth2,
      };
    }, [propMinWidth2]);
  
    return (
      <div
        className={`self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[4.125rem] box-border gap-[1.062rem] max-w-full text-left text-[1rem] text-darkgray font-poppins mq450:h-auto mq450:pb-[1.75rem] mq450:box-border mq1150:pb-[2.688rem] mq1150:box-border ${className}`}
      >
        <div className="self-stretch flex flex-row items-start justify-start box-border max-w-full">
          <img
            className="h-[31.25rem] flex-1 relative rounded-3xl max-w-full overflow-hidden object-cover"
            loading="lazy"
            alt=""
            src={previewImages}
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.812rem] box-border gap-[0.75rem] max-w-full shrink-0">
          <div className="flex flex-col items-start justify-start gap-[0.937rem] max-w-full">
            <div
              className="flex flex-row items-start justify-start gap-[2.187rem] max-w-full mq450:flex-wrap mq450:gap-[1.063rem]"
              style={postCategoriesStyle}
            >
              <div className="flex flex-row items-start justify-start gap-[0.437rem]">
                <div className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem]">
                  <img
                    className="w-[1.25rem] h-[1.25rem] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="https://figma-to-code-ecom-design.vercel.app/dashiconsadminusers.svg"
                  />
                </div>
                <div className="relative inline-block min-w-[3.313rem]">
                  Admin
                </div>
              </div>
              <div
                className="flex flex-row items-start justify-start gap-[0.687rem]"
                style={dateIconsStyle}
              >
                <img
                  className="h-[1.25rem] w-[1.25rem] relative overflow-hidden shrink-0"
                  alt=""
                  src="https://figma-to-code-ecom-design.vercel.app/uiscalender.svg"
                />
                <div className="relative inline-block min-w-[5.625rem]">
                  14 Oct 2022
                </div>
              </div>
              <div
                className="flex flex-row items-start justify-start gap-[0.437rem]"
                style={tagIconsStyle}
              >
                <img
                  className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
                  loading="lazy"
                  alt=""
                  src="https://figma-to-code-ecom-design.vercel.app/citag.svg"
                />
                <div
                  className="relative inline-block min-w-[2.938rem]"
                  style={woodStyle}
                >
                  {wood}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.187rem] text-[1.875rem] text-black">
              <h2 className="m-0 relative text-inherit font-medium font-inherit mq450:text-[1.125rem] mq800:text-[1.5rem]">
                {goingAllInWithMillennialD}
              </h2>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.187rem] box-border max-w-full text-justify text-[0.938rem]">
            <div className="flex-1 relative leading-[150%] inline-block max-w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
              sollicitudin aliquam ultrices. Morbi blandit cursus risus at
              ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
              Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
              nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
              cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
              elementum.
            </div>
          </div>
        </div>
        <div className="w-[5.938rem] flex flex-row items-start justify-start py-[0rem] px-[0.187rem] box-border text-justify text-black">
          <div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            <div className="relative inline-block min-w-[5.563rem]">
              Read more
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.312rem] pl-[0.375rem]">
              <div className="h-[0.063rem] flex-1 relative box-border border-t-[1px] border-solid border-black" />
            </div>
          </div>
        </div>
      </div>
    );
  };


export default BlogPostList;