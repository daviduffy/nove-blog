<?php
  // Menu
  // ===========================================================================
  // Create a series of menu links
  function create_menu_links($data){
    $html = '';
    foreach ($data as $current) {
      $dasherized = strtolower(str_replace(" ", "-", $current[0]));
      $html .= "<li class='Header__link Header__link--$dasherized'><a class='a a--menu' href='$current[1]'>
                <span class='h6'>$current[0]</span>
              </a></li>";
    }
    echo $html;
  };
  unset($html);

  // Menu
  // ===========================================================================
  // Create a series of menu links
  function create_signup_login_links($data){
    $html = '';
    foreach ($data as $current) {
      [$text, $href] = $current;
      $dasherized = strtolower(str_replace(" ", "-", $text));
      // makes login link open in a new tab and correctly sets noopener noreferrer
      $conditional_target_blank = $text == 'Log In' ? "target='_blank' rel='noopener noreferrer'" : "";
      $html .= "<li class='Header__link Header__link--$dasherized'>
                  <a class='a a--menu' $conditional_target_blank href='$href'>
                    <span class='h6'>$text</span>
                  </a>
                </li>";
    }
    echo $html;
  };
  unset($html);

  // Plan
  // ===========================================================================
  // Create the details markup of a single plan
  function create_plan_details($data){
    $html = 
      "<h2 class='Plan__title section__heading h1'>$data[0]</h2>
        <div class='Plan__body'>
          <p class='Plan__description p'>$data[1]</p>
          <p class='Plan__price h4'>$data[2]</p>
          <a class='Plan__button Plan__button--$data[0] button' href='https://app.nove.io/settings?$data[3]'>sign up</a>
          <ul class='Plan__benefits'>";
    foreach ($data[4] as $current) {
      $html .= "<li class='Plan__benefit'><span class='p'>$current</span></li>";
    }
    $html .= "</ul>
          </div>";
    echo $html;
  };
  unset($html);

  // Feature grid
  // ===========================================================================
  function create_feature_heading($data){
    $html = " <li class='Feature'>
                <div class='Feature__row Feature__row--heading'>
                 <div class='Feature__cell Feature__cell--title'></div>";
    foreach($data as $current){
      $html .=  "<div class='Feature__cell Feature__cell--$current h3'>$current</div>";
    }
    $html .=  "</div>
              </li>";
    echo $html;
  }

  // Feature grid
  // ===========================================================================
  function create_feature_grid($data){
    $html = "<li class='Feature'>";
    foreach ($data as $current) {
      $html .= create_feature_row($current);
    }
    $html .= "</li>";
    echo $html;
  };
  unset($html);

  // Feature row
  // ===========================================================================
  function create_feature_row($data){
    [$info, $attributes] = $data;
    [$title, $text] = $info;
    $hasMore = strpos($text, "%%");
    $html .= "<div class='Feature__row'>
                <div class='Feature__cell Feature__cell--title'>
                  <h4 class='Feature__title h4'>$title</h4>";
    if ($hasMore === false) {
      $html .=      "<p class='Feature__text h6'>$text</p>";
    } else {
      $pieces = explode("%%", $text);
      [$tease, $rest] = $pieces;
      $html .=       "<span class='Feature__text h6'>$tease<span class='RM'>&hellip;</span></span>
                      <button class='Feature__more-button button button--un a a--f RM' onclick='Feature.expand(this);'>
                        <span class='h6'>more</span>
                      </button>
                      <span class='Feature__text Feature__text--more h6' style='display: none;'>$rest</span>";
    }
    $html .= "</div>";
    foreach ($attributes as $cell) {
      // $size = sizeof($cell);
      // echo "$size     |";
      if (sizeof($cell) == 2) {
        [$text, $tipText] = $cell;
        $downcased = strtolower($text);
        $tip = ui_tip(['', $tipText]);
        $html .= "<div class='Feature__cell Feature__cell--$downcased h3'>
                    <i class='Feature__icon Ic Ic--$downcased'></i>
                    <span class='Feature__value txt-c'>$text</span>
                    $tip
                  </div>";
      } else {
        $downcased = strtolower($cell);
        $html .= "<div class='Feature__cell Feature__cell--$downcased'>
                    <i class='Feature__icon Ic Ic--$downcased'></i>
                    <span class='Feature__value txt-c'>$cell</span>
                  </div>";
      }
    }
    $html .= "</div>";
    return $html;
  };

  // UI Tip
  // ===========================================================================
  function ui_tip($data){
    $html = "<span class='UItip $data[0]' tabindex='0'>
              <i aria-hidden='true' class='UItip__icon'><span>i</span></i>
              <span class='UItip__text'>
                $data[1]
              </span>
            </span>";
    return $html;
  };
  unset($html);
