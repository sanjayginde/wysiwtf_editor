class DiffController < ApplicationController

  def html
    html1 = params[:html1]
    html2 = params[:html2]

    puts DaisyDiff.strings(html1, html2)
    result = DaisyDiff::Result.new DaisyDiff.strings(html1, html2)
    # doc = Nokogiri::HTML.parse DaisyDiff.strings(html1, html2)
    # body = doc.css('body')
    # body.css('script').remove
    # body.css('div.diff-topbar').remove
    # body.inner_html

    render :text => result.html
  end
end