module Jekyll
  class CodeBlock < Liquid::Block
    def initialize(name, params, tokens)
      args = split_params(params)
      @language = "python"
      if args.size > 0
        @language = args[0].strip
      end
      super
    end
    def render(context)
      text = super
      "<pre class=\"code\">
       <code class=\"#{@language}\">
          #{text}
      </code>
      </pre>
      "
    end
    def split_params(params)
      params.split("|")
    end
  end
end

Liquid::Template.register_tag('code', Jekyll::CodeBlock)