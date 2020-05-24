require 'nokogiri'
module Jekyll
  class TimeLineTag < Liquid::Tag

    def initialize(tag_name, input, tokens)
      super
      params = split_params(input)
      @items = params[0]
      @start = params[1].to_i
      @width = params[2].to_i
      @height = params[3].to_i
    end
    def split_params(params)
      params.split("|")
    end
    def render_items()
      output_html = ""
      if !@items.nil? && !@items.empty?
        jarray = JSON.parse(@items)
        jarray.each_with_index do |item, index|
            output_html +=%{
              <div class="ztm-item" data-image="#{item["image"]}">
                  <div class="hex-desc-con">
                    <div class="hex-desc">
                      #{item["year"]}
                    </div>
                  </div>
                  <div class="ztm-content">
                    <h3 class="the-heading">#{item["title"]}</h3>
                    <p>#{item["content"]}</p>
                  </div>
              </div>
            }
        end
      end
      output_html
    end
    def render(context)
      %{
         <section class="mcon-maindemo bgwhite" style="position: relative; padding-top:100px; padding-bottom:50px;">
                <div class="full-bg" style="background-image: url(../img/bg1.jpg)"></div>
                <br>
                <div class="full-bg--overlay" style=""></div>
                  <div class="zoomtimeline mode-3dslider mode-3dslider--show-7 auto-init" data-options="{
                      startItem: #{@start}
                      ,color_highlight: 'lime'
                      ,mode_3dslider_item_width: '#{@width}'
                      ,mode_3dslider_item_height: '#{@height}'
                      ,mode_3dslider_year_padding: '15'
                      }" >
                      <div class="items">
                          #{render_items}
                      </div>
                  </div>
                 <!-- the preloader START -->
                <div class="preloader-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <!-- the preloader END -->
         </section>
      }.strip
    end
  end
end

Liquid::Template.register_tag('timeline', Jekyll::TimeLineTag)