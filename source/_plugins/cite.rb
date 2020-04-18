module Jekyll
  class CiteTag < Liquid::Tag

    def initialize(tag_name, number, tokens)
      super
      @number = number
    end

    def render(context)
      "<sup id=\"fnref:#{@number}\"><a href=\"#fn:#{@number}\" class=\"footnote\">[#{@number}]</a></sup>"
    end
  end

  class FootNotesTag < Liquid::Tag

    def initialize(tag_name, refs, tokens)
      super
      @refs = refs
    end
    def render(context)
      begin
        output_html = "<div class=\"footnotes\"><ul>"
        if !@refs.nil? && !@refs.empty?
          jarray = JSON.parse(@refs)
            jarray.each_with_index do |item, index|
              if item.key?("title") && item.key?("url")
                output_html+= "<li id=\"fn:#{index + 1}\">"
                output_html+="#{item["title"].to_s}"
                output_html+="<a href=\"#{item["url"].to_s}\" class=\"reversefootnote\" target=\"_blank\">&#160;&#8617;</a></li>"
              end
            end
        end
        output_html+= "</ul></div>"
      end
      output_html
    end
  end

end

Liquid::Template.register_tag('cite', Jekyll::CiteTag)
Liquid::Template.register_tag('footnotes', Jekyll::FootNotesTag)