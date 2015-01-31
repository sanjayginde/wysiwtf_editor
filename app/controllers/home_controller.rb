class HomeController < ApplicationController
  def index
        html1 = <<-HTML
"<p>I got some text here.<p>"
    HTML
    html2 = <<-HTML
"<p>I got <i>even more</i> text here.</p>"
    HTML

    puts DaisyDiff.strings(html1, html2)
  end

  def quill
  end

end
